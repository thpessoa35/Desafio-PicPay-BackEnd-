export class ErrorValidationCpf extends Error {
    constructor(){
        super('Erro ao criar CPF.')
        this.name = 'ErrorCreatingCpf'
    }
}