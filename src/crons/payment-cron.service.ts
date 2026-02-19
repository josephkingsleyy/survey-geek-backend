import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentCronService {
    private readonly logger = new Logger(PaymentCronService.name);
    private readonly BATCH_SIZE = 100;

    constructor(private prisma: PrismaService) { }

    // Check failed/pending payments every hour
    @Cron(CronExpression.EVERY_HOUR)
    async checkPendingPayments() {
        this.logger.debug('Checking pending payments in batches...');

        let skip = 0;
        let processedCount = 0;

        while (true) {
            const pending = await this.prisma.payment.findMany({
                where: { status: 'pending' },
                select: {
                    id: true,
                    createdAt: true,
                },
                skip,
                take: this.BATCH_SIZE,
            });

            if (pending.length === 0) break;

            this.logger.debug(`Processing batch of ${pending.length} payments, offset: ${skip}`);

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

            processedCount += pending.length;
            skip += this.BATCH_SIZE;

            // Allow event loop to process other tasks
            await new Promise((resolve) => setImmediate(resolve));
        }

        this.logger.log(`Checked ${processedCount} pending payments completed.`);
    }

    // Runs once every day at midnight
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handlePaymentExpiration() {
        this.logger.log('Running payment expiration cron in batches...');

        const now = new Date();
        let skip = 0;
        let processedCount = 0;

        while (true) {
            // Find all active payments (not expired or failed)
            const payments = await this.prisma.payment.findMany({
                where: {
                    status: { in: ['pending', 'success'] },
                },
                select: {
                    id: true,
                    createdAt: true,
                },
                skip,
                take: this.BATCH_SIZE,
            });

            if (payments.length === 0) break;

            this.logger.debug(`Processing expiration batch of ${payments.length} payments, offset: ${skip}`);

            for (const payment of payments) {
                const createdAt = new Date(payment.createdAt);
                const diffDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

                if (diffDays > 30) {
                    // await this.prisma.payment.update({
                    //     where: { id: payment.id },
                    //     data: { status: 'expired' },
                    // });
                    this.logger.warn(`Payment ${payment.id} marked as expired.`);
                }
            }

            processedCount += payments.length;
            skip += this.BATCH_SIZE;

            // Allow event loop to process other tasks
            await new Promise((resolve) => setImmediate(resolve));
        }

        this.logger.log(`Payment expiration check for ${processedCount} payments completed.`);
    }
}
