import { Controller } from '@nestjs/common';
import { CronsService } from './crons.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Crons & Scheduled Jobs')
@Controller('crons')
export class CronsController {
  constructor(private readonly cronsService: CronsService) {}
}
