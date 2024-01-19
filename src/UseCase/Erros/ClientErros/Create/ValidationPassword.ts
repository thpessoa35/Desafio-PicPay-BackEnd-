
import ValidatorPassword, { ErrosSenha } from "../../../Client/Create/validator/validatorPassword";
import { ValidatePassword } from "../ErrorsCustomization/Create/ErrorPasswordCustomization/ValidationPassword";


export class ValidationPassword {
     validatePassword(password: string) {
        
        const passwordValidation = ValidatorPassword(password);
        if (!passwordValidation.valido) {
            const errors: ErrosSenha = passwordValidation.erros || {};
            const errorList: string[] = Object.values(errors);
            throw new ValidatePassword(errorList)
        };
    };
}