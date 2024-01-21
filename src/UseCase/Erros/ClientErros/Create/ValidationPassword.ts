

import { ValidatePassword } from "../ErrorsCustomization/Create/ErrorPasswordCustomization/ValidationPassword";
import ValidatorPassword, { ErrosSenha } from "./validator/validatorPassword";


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