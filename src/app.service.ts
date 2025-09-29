import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Survey geek backend is running fine';
  }
}
