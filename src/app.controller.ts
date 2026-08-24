import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'System Root Health Check' })
  @ApiResponse({ status: 200, description: 'Returns system greeting / health status.' })
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
