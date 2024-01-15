import { Response } from "express";
import { ErrorFindByID } from "./ErrorsCustomization/ErrorFindById";
import { ErrorAmount } from "./ErrorsCustomization/ErrorAmount";
import { ErrorLogistics } from "./ErrorsCustomization/ErrorLogistics";
import { ErrorValidadeService } from "./ErrorsCustomization/ErrorValidateService";

export class HandleErrorController extends Error{
    async handleError(res: Response, error: any) {
        console.error('Handling error:', error);
        if (error instanceof ErrorFindByID) {
            return res.status(400).json({ message: error.message });
        } 
        if (error instanceof ErrorAmount) {
            return res.status(400).json({ message: error.message });
        } 
        if (error instanceof ErrorLogistics) {
            return res.status(400).json({ message: error.message });
        } 
        if (error instanceof ErrorValidadeService) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
