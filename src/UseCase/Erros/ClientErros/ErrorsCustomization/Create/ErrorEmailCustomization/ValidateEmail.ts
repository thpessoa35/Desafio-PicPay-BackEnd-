export class ErrorValidationEmail extends Error{
    constructor(){
        super('Erro ao cadastrar Email')
        this.name = 'ErrorCreatingEmail'
    }
}