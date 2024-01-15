
export interface TransactionDTO {
    idTransfer?: string,
    amount: number,
    sender: string,
    receiver: string,
    logistics?: string
}