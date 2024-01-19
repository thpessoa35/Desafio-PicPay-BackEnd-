import { ITransactionRepository } from "../../../Repository/Service/TransactionRepository";

export class GetTransactionUseCase {
    constructor(private TransactionRepository: ITransactionRepository){}

    async FindMany(){
        const findALL = await this.TransactionRepository.get()
        return findALL
    }
}