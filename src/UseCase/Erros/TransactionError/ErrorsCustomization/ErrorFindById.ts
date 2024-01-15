export class ErrorFindByID extends Error{
    constructor(){
        super('Cliente não encontrado.')
        this.name = 'ErrorFindByID'
    }
}