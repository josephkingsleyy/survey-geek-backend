import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TicketController],
  providers: [TicketService],
  imports: [
    PrismaModule
  ]
})
export class TicketModule { }
