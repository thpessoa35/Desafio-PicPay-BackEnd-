import { Response } from "express";
import { ErrorValidationEmail } from "./ErrorsCustomization/ErrorEmailCustomization/ValidateEmail";
import { ErrorValidationCpf } from "./ErrorsCustomization/ErrorCpfCustomization/ValidateCpf";
import { ErrorFindByCpf } from "./ErrorsCustomization/ErrorCpfCustomization/ErrorFindByCpf";
import { ValidatePassword } from "./ErrorsCustomization/ErrorPasswordCustomization/ValidationPassword";
import { ErrorFindByEmail } from "./ErrorsCustomization/ErrorEmailCustomization/ErrorFindByEmail";

export class HandleErrorController extends Error {
    
    handleError(res: Response, error: any) {
    
        if (error instanceof ErrorValidationEmail) {
            return res.status(400).json({ message: error.message });
        }
        if(error instanceof ErrorFindByEmail){
            return res.status(400).json({ message: error.message });
        }    
        if(error instanceof ErrorValidationCpf){
            return res.status(400).json({ message: error.message });
        }
        if(error instanceof ErrorFindByCpf){
            return res.status(400).json({ message: error.message });
        }
        if (error instanceof ValidatePassword) {
            return res.status(400).json({ message: error.errors });
        }
        return res.status(404).json({ message: 'Error 404' });
    }
}
