import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SurveyCronService {
    constructor(
        private prisma: PrismaService,
    ) { }
    private readonly logger = new Logger(SurveyCronService.name);

    // Run every midnight
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleDailyCleanup() {
        this.logger.debug('Running daily cleanup job...');

        const THIRTY_DAYS_AGO = new Date();
        THIRTY_DAYS_AGO.setDate(THIRTY_DAYS_AGO.getDate() - 30);

        const deleted = await this.prisma.survey.deleteMany({
            where: {
                status: 'TRASH',
                updatedAt: {
                    lte: THIRTY_DAYS_AGO,
                },
            },
        });

        this.logger.log(`Deleted ${deleted.count} surveys permanently`);
    }

    // Run every 10s (test)
    // @Cron('*/10 * * * * *')
    // testCron() {
    //   this.logger.debug('General test cron running every 10s');
    // }
}
