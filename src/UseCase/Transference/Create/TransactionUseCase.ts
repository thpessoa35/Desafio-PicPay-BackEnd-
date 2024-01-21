
import { Transaction } from "../../../Entites/Transaction";
import { ITransactionRepository } from "../../../Repository/Service/TransactionRepository";
import { EmailService } from "../../../Services/EmailService";
import { EmailUseCase } from "../../../Services/EmailUseCase";
import { ValidationService } from "../../Erros/TransactionError/Create/ValidationService";
import { ValidationTransaction } from "../../Erros/TransactionError/Create/ValidationTransaction";
import { TransactionDTO } from "./TransactionDTO";

export class TransactionUseCase {
    private validationTransaction: ValidationTransaction;
    private validationService: ValidationService;
    

    constructor(private iTransactionRepository: ITransactionRepository) {
        this.validationTransaction = new ValidationTransaction(iTransactionRepository);
        this.validationService = new ValidationService();
        
    }

    async create(data: TransactionDTO) {
        try {

            await this.validationTransaction.validateAmount(data.sender, data.amount);
            await this.validationTransaction.getType(data.sender)
            await this.validationTransaction.decreaseBalance(data.sender, data.amount);
            await this.validationTransaction.increaseBalance(data.receiver, data.amount);

            const serviceResult = await this.validationService.validateService();
            const newTransaction = new Transaction({
                amount: data.amount,
                sender: data.sender,
                receiver: data.receiver
            });

            await this.iTransactionRepository.create(newTransaction);
            console.log(serviceResult);   
            const { senderEmail, receiverEmail } = await this.validationTransaction.getEmail(data.sender, data.receiver);
            await this.validationTransaction.sendTransferConfirmationEmail(senderEmail, receiverEmail, data);

        } catch (error) {
            if (data.idTransfer) {
                console.log(data.idTransfer)
                await this.iTransactionRepository.reverseTransactionById(data.idTransfer)
            };
            throw error;
        };
    };
};
