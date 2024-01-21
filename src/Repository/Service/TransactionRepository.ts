import { Transaction } from "../../Entites/Transaction";
export interface ITransactionRepository {
    create(data: Transaction): Promise<void>;
    get(): Promise<Transaction[]>;
    getSale(sender: string): Promise<number | null>;
    increaseBalance(receiverId: string, amount: number): Promise<void>;
    decreaseBalance(sender: string, amount: number): Promise<void>;
    reverseBalanceChanges(sender: string, receiver: string, amount: number): Promise<void>
    reverseTransactionById(idTransfer: string): Promise<void>,
    getEmailSender(sender: string): Promise<string>
    getEmailDoReceiver(receiver: string): Promise<string>
    GetUniqueTransaction(idTransfer: string): Promise<Transaction>
    getType(idClient: string): Promise<string | null>
};
