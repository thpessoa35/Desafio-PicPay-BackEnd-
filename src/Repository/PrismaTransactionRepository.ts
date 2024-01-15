import { Transaction } from "../Entites/Transaction";
import { PrismaService } from "../Infra/database/prisma";
import { ErrorFindByID } from "../UseCase/Erros/TransactionError/ErrorsCustomization/ErrorFindById";
import { ITransactionRepository } from "./Service/TransactionRepository";

export class PrismaTransactionRepository implements ITransactionRepository {
    private prismaService: PrismaService
    constructor(prismaService: PrismaService) {
        this.prismaService = prismaService
    }
    async create(data: Transaction): Promise<void> {
        console.log('Saving transaction:', data);
        const transferData = {
            idTransfer: data.idTransfer,
            amount: data.amount,
            sender: { connect: { idClient: data.sender } },
            receiver: { connect: { idClient: data.receiver } },
            logistics: data.logistics
                ? { connect: { idLogistics: data.logistics } }
                : undefined,
        };
        await this.prismaService.transfer.create({
            data: transferData
        });
    }
    async get(): Promise<Transaction[]> {
        const findALL = await this.prismaService.transfer.findMany()
        return findALL as any
    }

    async getSale(sender: string): Promise<number | null> {
        const client = await this.prismaService.client.findUnique({
            where: { idClient: sender },
            select: { sale: true },
        });

        return client?.sale as any
    }


    async increaseBalance(receiver: string, amount: number): Promise<void> {
        const existingClient = await this.prismaService.client.findUnique({
            where: { idClient: receiver },
        });

        if (!existingClient) {
            throw new ErrorFindByID()
        }

        await this.prismaService.client.update({
            where: { idClient: receiver },
            data: {
                sale: {
                    increment: amount,
                },
            },
        });
    };
    async decreaseBalance(sender: string, amount: number): Promise<void> {
        const existingClient = await this.prismaService.client.findUnique({
            where: { idClient: sender },
        });

        if (!existingClient) {

            throw new ErrorFindByID()
        }


        await this.prismaService.client.update({
            where: { idClient: sender },
            data: {
                sale: {
                    decrement: amount,
                },
            },
        });
    }


    async reverseBalanceChanges(sender: string, receiver: string, amount: number): Promise<void> {
        const transaction = await this.prismaService.$transaction(async (prisma) => {
            try {
                // Encontre os saldos originais dos clientes
                const originalSender = await prisma.client.findUnique({
                    where: { idClient: sender },
                    select: { sale: true },
                });

                const originalReceiver = await prisma.client.findUnique({
                    where: { idClient: receiver },
                    select: { sale: true },
                });

                // Verifique se os clientes foram encontrados
                if (!originalSender || !originalReceiver) {
                    throw new Error("nao encontrado");
                }


                await prisma.client.update({
                    where: { idClient: sender },
                    data: {
                        sale: {
                            increment: amount,
                        },
                    },
                });

                await prisma.client.update({
                    where: { idClient: receiver },
                    data: {
                        sale: {
                            decrement: amount,
                        },
                    },
                });

                console.log('Transaction reversed successfully');
            } catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    async reverseTransactionById(idTransfer: string) {
        try {
            const transaction = await this.prismaService.transfer.findUnique({
                where: { idTransfer: idTransfer },
            });

            if (!transaction) {
                throw new Error(`Transação com ID ${idTransfer} não encontrada.`);
            }

            const amountAsNumber: number = Number(transaction.amount);
            await this.reverseBalanceChanges(transaction.senderClientId, transaction.receiverClientId, amountAsNumber);


            await this.prismaService.transfer.delete({
                where: { idTransfer: idTransfer },
            });

            console.log(`Transação com ID ${idTransfer} revertida com sucesso.`);
        } catch (error) {
            console.error(`Erro ao reverter a transação com ID ${idTransfer}:`, error);
            throw error;
        }
    }
    async getEmailDoReceiver(receiver: string): Promise<string> {
        const FindEmail = await this.prismaService.client.findUnique({
            where: { idClient: receiver },
            select: { email: true },
        })
        return FindEmail?.email as any

    }
    async getEmailSender(sender: string): Promise<string> {
        const FindEmail = await this.prismaService.client.findUnique({
            where: { idClient: sender },
            select: { email: true },
        })
        return FindEmail?.email as any
    }
}

