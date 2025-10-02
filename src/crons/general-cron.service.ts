import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class GeneralCronService {
  private readonly logger = new Logger(GeneralCronService.name);

  // Run every midnight
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleDailyCleanup() {
    this.logger.debug('Running daily cleanup job...');
    // TODO: cleanup logs, archive data, etc.
  }

  // Run every 10s (test)
  // @Cron('*/10 * * * * *')
  // testCron() {
  //   this.logger.debug('General test cron running every 10s');
  // }
}
