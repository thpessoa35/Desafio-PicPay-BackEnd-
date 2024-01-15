export class ErrorFindByEmail extends Error {
    constructor(){
        super('Email já Cadastrado.')
        this.name = 'ErrorFindByEmail'
    }
}