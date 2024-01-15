import { Request, Response } from "express";
import { ClientUseCase } from "./ClientUseCase";
import { HandleErrorController } from "../Erros/ClientErros/HandleErrorController";
import { HandleSucessController } from "../Erros/ClientErros/HandleSucessController";

export class ClientController {
    private handleErrorController: HandleErrorController
    private handleSucessController: HandleSucessController
    constructor(private clientUseCase: ClientUseCase) {
        this.handleErrorController = new HandleErrorController();
        this.handleSucessController = new HandleSucessController()
    }
    async save(req: Request, res: Response): Promise<Response> {
        try {
            const { email, name, password, cpf } = req.body;
            await this.clientUseCase.create({ email, name, password, cpf });

            return this.handleSucessController.successResponse(res, 'Client created successfully');
        } catch (error: any) {
            return this.handleErrorController.handleError(res, error);
        };
    };
};
