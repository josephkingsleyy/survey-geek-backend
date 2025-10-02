import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [ResponseController],
  providers: [ResponseService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class ResponseModule { }
