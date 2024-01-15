import { IUserRepository } from "../../../Repository/Service/UserRepository";
import { validateCPF } from "../../Client/validator/validatorCpf";
import { ErrorFindByCpf } from "./ErrorsCustomization/ErrorCpfCustomization/ErrorFindByCpf";
import { ErrorValidationCpf } from "./ErrorsCustomization/ErrorCpfCustomization/ValidateCpf";

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
