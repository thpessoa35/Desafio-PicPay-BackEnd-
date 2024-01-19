    export class ErrorFindByCpf extends Error {
        constructor(){
            super('Cpf já cadastrado')
            this.name = 'ErrorFindByCpf'
        }
    }