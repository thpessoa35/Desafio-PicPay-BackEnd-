import { Response } from "express";
import { ErrorValidationEmail } from "../ErrorsCustomization/Create/ErrorEmailCustomization/ValidateEmail";
import { ErrorFindByEmail } from "../ErrorsCustomization/Create/ErrorEmailCustomization/ErrorFindByEmail";
import { ErrorValidationCpf } from "../ErrorsCustomization/Create/ErrorCpfCustomization/ValidateCpf";
import { ErrorFindByCpf } from "../ErrorsCustomization/Create/ErrorCpfCustomization/ErrorFindByCpf";
import { ValidatePassword } from "../ErrorsCustomization/Create/ErrorPasswordCustomization/ValidationPassword";


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
