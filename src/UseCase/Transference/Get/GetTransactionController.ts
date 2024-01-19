import { Request, Response } from "express";
import { GetTransactionUseCase } from "./GetTransactionUseCase";

import { HandleErrorController } from "../../Erros/TransactionError/Create/HandleErrorController";
import { HandleSucessController } from "../../Erros/ClientErros/Get/HandlesucessController";

export class GetTransactionController {
    private handleSucessController: HandleSucessController
    private handleErrorController: HandleErrorController
    constructor(private getTransactionUseCase: GetTransactionUseCase) {
        this.handleSucessController = new HandleSucessController()
        this.handleErrorController = new HandleErrorController()
    }

    async findMany(req: Request, res: Response): Promise<Response> {
        try {
            const findALL = await this.getTransactionUseCase.FindMany()
            return this.handleSucessController.handleSucess(res, findALL)
        } catch (error) {
            return this.handleErrorController.handleError(res, error)
        };
    };
};