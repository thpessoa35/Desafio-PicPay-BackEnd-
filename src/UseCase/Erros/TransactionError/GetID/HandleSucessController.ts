import { Response } from "express";

export class HandleSucessController {
    handleSucess(res: Response, data: any) {
       return res.status(200).json({data});
    }
}