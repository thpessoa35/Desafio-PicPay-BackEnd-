// email-service/src/controllers/EmailController.ts
import { EmailService, EmailOptions } from './EmailService';

export class EmailUseCase{

  constructor(private emailService: EmailService) {
  }

  async sendEmail(to: string, subject: string, body: string){
    const emailOptions: EmailOptions = {
      from: 'tmp10123025007@gmail.com',
      to,
      subject,
      text: body,
    };

    await this.emailService.sendEmail(emailOptions);
  };
};


