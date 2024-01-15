import { Client } from "../../Entites/client";
import { IUserRepository } from "../../Repository/Service/UserRepository";
import { ClientDTO } from "./Client.DTO";
import bcrypt from 'bcrypt'
import { EmailValidation } from "../Erros/ClientErros/ValidationEmail";
import { ValidationCpf } from "../Erros/ClientErros/ValidationCpf";
import { ValidationPassword } from "../Erros/ClientErros/ValidationPassword";

export class ClientUseCase {
    private iUserRepository: IUserRepository;
    private emailValidation: EmailValidation;
    private validationCpf: ValidationCpf
    private validationPassword: ValidationPassword

    constructor(iUserRepository: IUserRepository) {
        this.iUserRepository = iUserRepository
        this.emailValidation = new EmailValidation(iUserRepository)
        this.validationCpf = new ValidationCpf(iUserRepository)
        this.validationPassword = new ValidationPassword()
    }

    async create(data: ClientDTO) {
        try {
            await this.emailValidation.validate(data.email);
            await this.validationCpf.validateCpf(data.cpf);
            this.validationPassword.validatePassword(data.password)

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(data.password, salt);

            const newClient = new Client({
                email: data.email,
                name: data.name,
                password: hashPassword,
                cpf: data.cpf,
            });

            await this.iUserRepository.create(newClient);

        } catch (error) {
            throw error;
        };
    };
};
