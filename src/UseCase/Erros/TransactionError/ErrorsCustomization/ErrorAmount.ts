export class ErrorAmount extends Error{
    constructor(){
        super('Saldo Negativo.')
        this.name = 'ErrorAmount'
    }
}