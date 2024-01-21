import { IUserRepository } from "../../../../Repository/Service/UserRepository";
import { ErrorFindByCpf } from "../ErrorsCustomization/Create/ErrorCpfCustomization/ErrorFindByCpf";
import { ErrorValidationCpf } from "../ErrorsCustomization/Create/ErrorCpfCustomization/ValidateCpf";
import { validateCPF } from "./validator/validatorCpf";


export class ValidationCpf {

    private iUserRepository: IUserRepository;

    constructor(iUserRepository: IUserRepository) {
        this.iUserRepository = iUserRepository;
    }

    async validateCpf(cpf: string) {
        const existingClient = await this.iUserRepository.findbyCpf(cpf);

        if (existingClient) {
            throw new ErrorFindByCpf();
        }

        if (!validateCPF(cpf)) {
            throw new ErrorValidationCpf();
        }
    }
}
