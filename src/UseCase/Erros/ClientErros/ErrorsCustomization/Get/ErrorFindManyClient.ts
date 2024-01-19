export class ErrorFindManyClient extends Error{
    constructor(){
        super('Erro ao buscar Clientes.');
        this.name = 'ErrorFindClientMany'
    }
}