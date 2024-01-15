export class ErrorValidadeService extends Error{
    constructor(){
        super('Error ao consultar Servico Exterior')
        this.name = 'ErrorService'
    }
}