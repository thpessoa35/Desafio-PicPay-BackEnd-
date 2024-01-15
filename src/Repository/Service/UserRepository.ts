import { Client } from "../../Entites/client";

export interface IUserRepository {
    create(data: Client):Promise<void>;
    findbyCpf(cpf: string): Promise<Client | null>;
    findbyEmail(email: string):Promise<Client | null>;
};


export const MockUserRepository: IUserRepository ={
    create: jest.fn(),
    findbyCpf: jest.fn(),
    findbyEmail: jest.fn()
};