import { IUserRepository } from "../../../Repository/Service/UserRepository";

export class GetUseCase {
    constructor(private iUserRepository: IUserRepository) { }
    async findALL() {
        try {
            const get = await this.iUserRepository.get();
            return get;
        }catch(error){
            throw error
        };
    };
};