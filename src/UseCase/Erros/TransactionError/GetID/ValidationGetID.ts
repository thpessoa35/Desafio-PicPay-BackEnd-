import { ITransactionRepository } from "../../../../Repository/Service/TransactionRepository";
import { ErrorFindByIDTransfer } from "../ErrorsCustomization/ErrorFindByIDTransfer";

export class ValidationGetID {
    constructor(private iTransactionRepository: ITransactionRepository) { }
    
    async validateID(idTransfer: string) {
       const findID = await this.iTransactionRepository.GetUniqueTransaction(idTransfer)
       if(!findID){
            throw new ErrorFindByIDTransfer()
       }
    }
}