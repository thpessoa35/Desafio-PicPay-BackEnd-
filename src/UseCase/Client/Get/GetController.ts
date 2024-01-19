import { Request, Response } from "express";
import { GetUseCase } from "./GetUseCase";
import { HandleSucessController } from "../../Erros/ClientErros/Get/HandlesucessController";
import { HandleErrorController } from "../../Erros/ClientErros/Get/HandleErrorController";


export class GetController {
    private handleSucessController: HandleSucessController
    private handleErrorController: HandleErrorController

    constructor(private getUseCase: GetUseCase) {
        this.handleSucessController = new HandleSucessController()
        this.handleErrorController = new HandleErrorController()
    };
    async findALL(req: Request, res: Response): Promise<Response> {
        try {
            const get = await this.getUseCase.findALL()
            return this.handleSucessController.handleSucess(res, get)
        } catch (error: any) {
            return this.handleErrorController.handleError(res, error)
        };
    };
}