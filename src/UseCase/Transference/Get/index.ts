import { PrismaService } from "../../../Infra/database/prisma";
import { PrismaTransactionRepository } from "../../../Repository/PrismaTransactionRepository";
import { GetTransactionController } from "./GetTransactionController";
import { GetTransactionUseCase } from "./GetTransactionUseCase";



const prismaService = new PrismaService();
const prismaTransactionRepository = new PrismaTransactionRepository(prismaService);
const getTransactionUseCase = new GetTransactionUseCase(prismaTransactionRepository)
export const getTransactionController = new GetTransactionController(getTransactionUseCase)
