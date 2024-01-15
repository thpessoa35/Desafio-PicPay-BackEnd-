import * as nodemailer from 'nodemailer';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  sendEmail(options: EmailOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(options, (error, info) => {
        if (error) {
          console.error('Erro ao enviar o e-mail:', error);
          reject(error);
        } else {
          console.log('E-mail enviado com sucesso:', info.response);
          resolve();
        }
      });
    });
  }
}

export { EmailService, EmailOptions };