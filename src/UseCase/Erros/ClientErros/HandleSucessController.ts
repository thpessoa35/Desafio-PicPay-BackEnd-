import { Response } from "express";
export class HandleSucessController {
     successResponse(res: Response, message: string) {
        return res.status(200).json({ message });
    };
}