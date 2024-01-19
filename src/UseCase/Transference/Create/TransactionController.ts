import { Request, Response } from "express";
import { TransactionUseCase } from "./TransactionUseCase";
import { HandleSucess } from "../../Erros/TransactionError/Create/HandleSucessController";
import { HandleErrorController } from "../../Erros/TransactionError/Create/HandleErrorController";

export class TransacitionController {
    private handleSucess: HandleSucess
    private handleErrorController: HandleErrorController
    constructor(private transactionUseCase: TransactionUseCase) {
        this.handleSucess = new HandleSucess()
        this.handleErrorController = new HandleErrorController()
    }

    async save(req: Request, res: Response): Promise<Response> {
        try {
            const { amount, sender, receiver } = req.body;

            await this.transactionUseCase.create({ amount, sender, receiver });

            return this.handleSucess.SucessResponse(res)

        } catch (error: any) {
            return this.handleErrorController.handleError(res, error)
        };
    };
};