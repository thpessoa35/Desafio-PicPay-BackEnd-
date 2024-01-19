import { PrismaService } from "../../../Infra/database/prisma";
import { PrismaClientRepository } from "../../../Repository/PrismaUserRepository";
import { ClientController } from "./ClientController";
import { ClientUseCase } from "./ClientUseCase";

const prismaService = new PrismaService();
const prismaClientRepository = new PrismaClientRepository(prismaService);
const clientUseCase = new ClientUseCase(prismaClientRepository);
export const clientController = new ClientController(clientUseCase)
