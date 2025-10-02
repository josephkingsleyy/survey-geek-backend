import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BillingCronService {
  private readonly logger = new Logger(BillingCronService.name);

  constructor(private prisma: PrismaService) {}

  // Runs every midnight to check expired billing
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleBillingExpiry() {
    this.logger.debug('Running billing expiry check...');

    const now = new Date();
    const expired = await this.prisma.billing.findMany({
      where: { expiresAt: { lte: now } },
      include: { user: true },
    });

    for (const bill of expired) {
      if (bill.userId) {
        await this.prisma.user.update({
          where: { id: bill.userId },
          data: { isActive: false },
        });
        this.logger.warn(
          `Billing ${bill.id} expired → User ${bill.userId} deactivated.`,
        );
      }
    }

    this.logger.log(`Processed ${expired.length} expired billings.`);
  }
}
