import { Client } from "../../../Entites/client";
import { IUserRepository } from "../../../Repository/Service/UserRepository";
import { ClientDTO } from "./Client.DTO";
import bcrypt from 'bcrypt'
import { EmailValidation } from "../../Erros/ClientErros/Create/ValidationEmail";
import { ValidationCpf } from "../../Erros/ClientErros/Create/ValidationCpf";
import { ValidationPassword } from "../../Erros/ClientErros/Create/ValidationPassword";
import { ValidationType } from "../../Erros/ClientErros/Create/ValidationType";

export class ClientUseCase {
    private iUserRepository: IUserRepository;
    private emailValidation: EmailValidation;
    private validationCpf: ValidationCpf
    private validationPassword: ValidationPassword
    private validationType: ValidationType

    constructor(iUserRepository: IUserRepository) {
        this.iUserRepository = iUserRepository
        this.emailValidation = new EmailValidation(iUserRepository)
        this.validationCpf = new ValidationCpf(iUserRepository)
        this.validationPassword = new ValidationPassword()
        this.validationType = new ValidationType()
    }

    async create(data: ClientDTO) {
        try {
            await this.emailValidation.validate(data.email);
            await this.validationCpf.validateCpf(data.cpf);
            this.validationPassword.validatePassword(data.password)
            this.validationType.validatetype(data.type)

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(data.password, salt);

            const newClient = new Client({
                email: data.email,
                name: data.name,
                password: hashPassword,
                cpf: data.cpf,
                type: data.type
            });

            await this.iUserRepository.create(newClient);

        } catch (error) {
            throw error;
        };
    };
};
