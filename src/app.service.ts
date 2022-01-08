import { Injectable } from '@nestjs/common';
import Mail from './services/mail';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!!';
  }

  sendMessage(message: any): string {
    Mail.to = message.to;
    Mail.subject = message.subject;
    Mail.message = message.message;
    const result = Mail.sendMail();

    return result + 'E-mail enviado';
  }
}
