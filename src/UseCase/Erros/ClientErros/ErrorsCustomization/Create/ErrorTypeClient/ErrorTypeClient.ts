export class ErrorTypeClient extends Error{
    constructor(){
        super('Cliente não autorizado para fazer transações')
    }
}