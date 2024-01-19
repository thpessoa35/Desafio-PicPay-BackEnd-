import { PrismaService } from "../../../Infra/database/prisma";
import { PrismaClientRepository } from "../../../Repository/PrismaUserRepository";
import { GetController } from "./GetController";
import { GetUseCase } from "./GetUseCase";


const prismaService = new PrismaService();
const prismaClientRepository = new PrismaClientRepository(prismaService);
const getUseCase = new GetUseCase(prismaClientRepository);
export const getController = new GetController(getUseCase)
