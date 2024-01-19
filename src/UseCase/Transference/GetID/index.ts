import { PrismaService } from "../../../Infra/database/prisma";
import { PrismaTransactionRepository } from "../../../Repository/PrismaTransactionRepository";
import { GetIDController } from "./GetIDController";
import { GetIDUseCase } from "./GetIDUseCase";



const prismaService = new PrismaService();
const prismaTransactionRepository = new PrismaTransactionRepository(prismaService);
const transactionUseCase = new GetIDUseCase(prismaTransactionRepository);
export const getIDtransactionController = new GetIDController(transactionUseCase)
