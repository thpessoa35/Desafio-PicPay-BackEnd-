import { Response } from "express";
import { ErrorFindByIDTransfer } from "../ErrorsCustomization/ErrorFindByIDTransfer";


export class HandleErrorController extends Error {
    async handleError(res: Response, error: any) {
        if (error instanceof ErrorFindByIDTransfer) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(404).json({ message: 'Error' });
    };
};
