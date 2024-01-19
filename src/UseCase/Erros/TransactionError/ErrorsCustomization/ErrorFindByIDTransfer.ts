export class ErrorFindByIDTransfer extends Error{
    constructor(){
        super('Transferência não encontrado.')
        this.name = 'ErrorFindByID'
    }
}