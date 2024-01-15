export class ErrorLogistics extends Error{
    constructor(){
        super('Cliente não autorizado.')
        this.name = 'ErrorLogistics'
    }
}