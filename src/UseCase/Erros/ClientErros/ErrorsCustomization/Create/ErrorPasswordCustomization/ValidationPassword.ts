export class ValidatePassword extends Error {
    errors: string[];

    constructor(errorList: string[]) {
        super('Erro na validação da senha');
        this.name = 'ErrorPasswordValidation';
        this.errors = errorList;
    }
}
