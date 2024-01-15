// email-service/src/controllers/EmailController.ts
import { Request, Response } from 'express';
import { EmailUseCase } from './EmailUseCase';

class EmailController {
  constructor(private emailUseCase: EmailUseCase) {}

  async sendEmail(req: Request, res: Response): Promise<void> {
    const { to, subject, text } = req.body;

    try {
      await this.emailUseCase.sendEmail(to, subject, text);
      res.status(200).json({ message: 'E-mail enviado com sucesso.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao enviar o e-mail.' });
    }
  }
}

export { EmailController };
