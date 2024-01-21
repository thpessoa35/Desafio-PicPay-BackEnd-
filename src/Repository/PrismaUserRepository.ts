import { IUserRepository } from './Service/UserRepository';
import { PrismaService } from '../Infra/database/prisma';
import { Client } from '../Entites/client';

export class PrismaClientRepository implements IUserRepository {
    constructor(private prismaService: PrismaService) { }

    async create(data: Client): Promise<void> {
        try {
            await this.prismaService.client.create({
                data: {
                    idClient: data.idClient,
                    email: data.email,
                    name: data.name,
                    password: data.password,
                    cpf: data.cpf,
                    sale: 0,
                    type: data.type
                }
            });
        } catch (error) {
            console.error('Erro no cadastro:', error);
            throw new Error('Erro no cadastro.');
        }
    }

    async findbyCpf(cpf: string): Promise<Client | null> {
        try {
            const findUnique = await this.prismaService.client.findUnique({
                where: { cpf: cpf },
            });

            if (!findUnique) {
                return null;
            }

            return findUnique as any;
        } catch (error) {
            console.error('Erro ao buscar CPF:', error);
            throw new Error('Erro ao buscar CPF.');
        }
    }

    async findbyEmail(email: string): Promise<Client | null> {
        try {
            const findUnique = await this.prismaService.client.findUnique({
                where: { email: email },
            });

            if (!findUnique) {
                return null;
            }

            return findUnique as any;
        } catch (error) {
            console.error('Erro ao buscar email:', error);
            throw new Error('Erro ao buscar email.');
        }
    }
    async get(): Promise<Client[]> {
        const findALL = await this.prismaService.client.findMany()
        return findALL.map((client)=> ({...client})) as any
    }
    async FindById(idClient: string): Promise<Client | null>{
        const findID = await this.prismaService.client.findUnique({where: {idClient: idClient}})
        if(!findID){
            throw Error('Usuario não Encontrado no banco de dados.') 
        }
        return findID as any
    }
}
