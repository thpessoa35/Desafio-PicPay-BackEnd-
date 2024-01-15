export class Transaction {
    public readonly idTransfer?: string
    public amount: number
    public sender: string
    public receiver: string
    public logistics?: string

    constructor(props: Omit<Transaction, 'idTransfer'>){
        this.amount = props.amount
        this.sender = props.sender
        this.receiver = props.receiver
        this.logistics = props.logistics
    };
};