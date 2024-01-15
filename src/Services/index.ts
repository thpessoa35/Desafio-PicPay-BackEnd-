
import { EmailController } from "./EmailController";
import { EmailService } from "./EmailService";
import { EmailUseCase } from "./EmailUseCase";


const emailService = new EmailService();
const emailUseCase = new EmailUseCase(emailService)
export const emailController = new EmailController(emailUseCase);

