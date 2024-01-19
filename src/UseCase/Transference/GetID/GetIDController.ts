import { Request, Response } from "express";
import { GetIDUseCase } from "./GetIDUseCase";
import { HandleSucessController } from "../../Erros/TransactionError/GetID/HandleSucessController";
import { HandleErrorController } from "../../Erros/TransactionError/GetID/HandleErrorController";

export class GetIDController{
    private handleSucessController: HandleSucessController
    private handleErrorController: HandleErrorController 
    constructor(private GetIDUseCase: GetIDUseCase){
        this.handleSucessController = new HandleSucessController()
        this.handleErrorController = new HandleErrorController
    }
    
    async FindUnique(req: Request, res: Response): Promise<Response>{
            try{
                const { idTransfer } = req.params;

                const findById = await this.GetIDUseCase.findUnique({idTransfer});

                return this.handleSucessController.handleSucess(res, findById)
            }catch(error){
                return this.handleErrorController.handleError(res, error)
            }
    }
}
