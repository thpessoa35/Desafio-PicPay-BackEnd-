import axios from "axios";
import { ITransactionRepository } from "../../../Repository/Service/TransactionRepository";
import { ErrorAmount } from "./ErrorsCustomization/ErrorAmount";
import { ErrorLogistics } from "./ErrorsCustomization/ErrorLogistics";
import { EmailService } from "../../../Services/EmailService";
import { EmailUseCase } from "../../../Services/EmailUseCase";
import { ValidationService } from "./ValidationService";

export class ValidationTransaction {
    emailService: EmailService
    emailUseCase: EmailUseCase
    validationService: ValidationService

    constructor(private iTransactionRepository: ITransactionRepository) {
        this.emailService = new EmailService()
        this.emailUseCase = new EmailUseCase(this.emailService)
        this.validationService = new ValidationService()
    }

    async validadeSale(sender: string) {
        const get = await this.iTransactionRepository.getSale(sender)
        return get as any
    }
    async validateAmount(sender: string, amount: number) {
        const getbalance = await this.validadeSale(sender);
        if (getbalance < 0) {
            throw new ErrorAmount();
        }
        if (getbalance < amount) {
            throw new ErrorAmount()
        }

    }
    async increaseBalance(receiver: string, amount: number) {
        await this.iTransactionRepository.increaseBalance(receiver, amount)
    }
    async decreaseBalance(sender: string, amount: number) {
        await this.iTransactionRepository.decreaseBalance(sender, amount)
    }
    async reverseTransactionById(idTransfer: string) {
        await this.iTransactionRepository.reverseTransactionById(idTransfer)
    }
    async validateLogistic(logistics: string, sender: string) {
        if (logistics === sender) {
            throw new ErrorLogistics()
        }
    }
    async getEmailSender(sender: string) {
        const getSender = await this.iTransactionRepository.getEmailSender(sender)
        return getSender
    }
    async getEmailReceiver(receiver: string) {
        const getEmailReceiver = await this.iTransactionRepository.getEmailDoReceiver(receiver)
        return getEmailReceiver
    }
    async getEmail(senderId: string, receiverId: string) {
        const [senderEmail, receiverEmail] = await Promise.all([
            await this.iTransactionRepository.getEmailSender(senderId),
            await this.iTransactionRepository.getEmailDoReceiver(receiverId)
        ]);
        return { senderEmail, receiverEmail };
    }

    async sendTransferConfirmationEmail(senderEmail: string, receiverEmail: string, data: any) {

        const validationService = await this.validationService.validateServiceEmail()

        if (validationService) {
            await this.emailUseCase.sendEmail(
                senderEmail,
                'Transferência realizada',
                `Transferencia Enviada para Enrico Libianco no valor de ${data.amount} reais`
            );
            await this.emailUseCase.sendEmail(
                receiverEmail,
                'Você recebeu uma transfêrencia',
                `Transferencia Recebida de Thiago Pessoa no valor de ${data.amount}`
            );
            console.log(validationService)
            return validationService.message
        }
    }
}