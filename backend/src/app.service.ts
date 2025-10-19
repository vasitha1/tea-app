import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Earthlixir API is running! Visit /api-docs for API documentation.';
  }
}
