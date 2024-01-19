import { ITransactionRepository } from "../../../Repository/Service/TransactionRepository";
import { ValidationGetID } from "../../Erros/TransactionError/GetID/ValidationGetID";
import { GetIDdto } from "./GetIDdto";

export class GetIDUseCase {
    private validationGetID: ValidationGetID
    constructor(private iTransactionRepository: ITransactionRepository) {
        this.validationGetID = new ValidationGetID(iTransactionRepository)
    }

    async findUnique(data: GetIDdto) {
        try {
            await this.validationGetID.validateID(data.idTransfer)
            const findById = await this.iTransactionRepository.GetUniqueTransaction(data.idTransfer)
            return findById
        } catch (error) {
            console.log(error)
            throw error
        };
    };
};