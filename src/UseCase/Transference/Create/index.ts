import { PrismaService } from "../../../Infra/database/prisma";
import { PrismaTransactionRepository } from "../../../Repository/PrismaTransactionRepository";
import { TransacitionController } from "./TransactionController";
import {  TransactionUseCase } from "./TransactionUseCase";


const prismaService = new PrismaService();
const prismaTransactionRepository = new PrismaTransactionRepository(prismaService);
const transactionUseCase = new TransactionUseCase(prismaTransactionRepository);
export const transactionController = new TransacitionController(transactionUseCase)
