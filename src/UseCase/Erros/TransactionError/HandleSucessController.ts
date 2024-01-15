import { Response } from "express";
import { ValidationService } from "./ValidationService";
export class HandleSucess {
    async SucessResponse(res: Response) {
        const validationService = new ValidationService()
        const data = validationService.validateService()
        const dataEmail = validationService.validateServiceEmail()
        return res.status(200).json({ messageService: (await data).message, messageEmail:(await dataEmail).message })
    };
};