import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTest(): any {
    return {success: true, message: "You have access to this resource"};
  }
}
