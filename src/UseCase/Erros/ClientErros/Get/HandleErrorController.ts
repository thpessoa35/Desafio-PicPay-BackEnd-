import { Response } from "express";
import { ErrorFindManyClient } from "../ErrorsCustomization/Get/ErrorFindManyClient";

export class HandleErrorController extends Error {
    async handleError(res: Response, error: any) {
        if (error instanceof ErrorFindManyClient) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(404).json({ message: 'Error 404' });
    }
}
