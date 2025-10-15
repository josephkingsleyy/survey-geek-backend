import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  controllers: [SectionController],
  providers: [SectionService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  imports: [PrismaModule]
})
export class SectionModule { }
