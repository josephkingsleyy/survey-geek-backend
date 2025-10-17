import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentCronService {
    private readonly logger = new Logger(PaymentCronService.name);

    constructor(private prisma: PrismaService) { }

    // Check failed/pending payments every hour
    @Cron(CronExpression.EVERY_HOUR)
    async checkPendingPayments() {
        this.logger.debug('Checking pending payments...');

        const pending = await this.prisma.payment.findMany({
            where: { status: 'pending' },
        });

        this.logger.log(`Found ${pending.length} pending payments.`);

        // Example: cancel if pending > 24h
        const now = new Date();
        for (const payment of pending) {
            const createdAt = new Date(payment.createdAt);
            const diffHours = (now.getTime() - createdAt.getTime()) / 1000 / 3600;

            if (diffHours > 24) {
                // await this.prisma.payment.update({
                //     where: { id: payment.id },
                //     data: { status: 'failed' },
                // });
                this.logger.warn(`Payment ${payment.id} marked as failed (timeout).`);
            }
        }
    }

    // Runs once every day at midnight
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handlePaymentExpiration() {
        this.logger.log('Running payment expiration cron...');

        const now = new Date();

        
        // Find all active payments (not expired or failed)
        const payments = await this.prisma.payment.findMany({
            where: {
                status: { in: ['pending', 'success'] }, // adjust if needed
            },
        });

        for (const payment of payments) {
            const createdAt = new Date(payment.createdAt);
            const diffDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

            if (diffDays > 30) {
                // await this.prisma.payment.update({
                //     where: { id: payment.id },
                //     data: { status: 'expired' },
                // });
                this.logger.warn(`Payment ${payment.id} marked as expired (30+ days old).`);
            }
        }

        this.logger.log('Payment expiration cron completed.');
    }
}
