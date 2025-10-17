import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [QuestionController],
  providers: [QuestionService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class QuestionModule { }
