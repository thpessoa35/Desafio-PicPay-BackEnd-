export class ValidationType {
    async validatetype(type: string){
        if(!(type === 'logistic' || type === "client")){
            throw new Error('tipo de cliente invalido')
        }
    }
}