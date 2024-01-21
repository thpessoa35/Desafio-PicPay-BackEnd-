import { ClientUseCase } from "./ClientUseCase";
import { IUserRepository, MockUserRepository } from "../../../Repository/Service/UserRepository";
import { ClientDTO } from "./Client.DTO";

import { ErrorFindByEmail } from "../../Erros/ClientErros/ErrorsCustomization/Create/ErrorEmailCustomization/ErrorFindByEmail";
import { ErrorFindByCpf } from "../../Erros/ClientErros/ErrorsCustomization/Create/ErrorCpfCustomization/ErrorFindByCpf";
import ValidatorPassword from "../../Erros/ClientErros/Create/validator/validatorPassword";
import { CaracterEmail } from "../../Erros/ClientErros/Create/validator/validatorEmail";


describe('Testing UseCase Erros async', () => {
    let clientUseCase: ClientUseCase;
    let mockUserRepository: IUserRepository;

    beforeEach(() => {
        mockUserRepository = MockUserRepository;
        clientUseCase = new ClientUseCase(mockUserRepository);
    });

    test('Creating Testing with error findbyEmail', async () => {
        const mockClient: ClientDTO = {
            cpf: '123',
            email: '123@example.com',
            name: '123',
            password: '123',
            
        };
        jest.spyOn(mockUserRepository, 'findbyEmail').mockResolvedValueOnce(mockClient);

        const createUser: ClientDTO = {
            cpf: '123',
            email: '123@example.com',
            name: '123',
            password: '123',
            
        };

        await expect(clientUseCase.create(createUser)).rejects.toThrow(ErrorFindByEmail);
    });
    test('Creating Testing with error findbyCpf', async () => {
        const mockClient: ClientDTO = {
            cpf: '123',
            email: '123@example.com',
            name: '123',
            password: '123',
            
        };
        jest.spyOn(mockUserRepository, 'findbyCpf').mockResolvedValueOnce(mockClient);

        const createUser: ClientDTO = {
            cpf: '123',
            email: '123@example.com',
            name: '123',
            password: '123',
            
        };

        await expect(clientUseCase.create(createUser)).rejects.toThrow(ErrorFindByCpf)
    });
});
describe('Testing UseCase Erros sync',()=>{
    test('testing ValidatorEmail', ()=>{

         const email = 'test123@hotmailcom';

         expect(CaracterEmail(email)).toBeFalsy()
    })

    test('testing ValidatorPassword with invalid password', () => {
        const invalidPassword = '';
    
        const result = ValidatorPassword(invalidPassword);
    
        expect(result.erros).toEqual({
            comprimento: "A senha deve ter no mínimo 8 caracteres.",
            maiuscula: "A senha deve conter pelo menos uma letra maiúscula.",
            minuscula: "A senha deve conter pelo menos uma letra minúscula.",
            numero: "A senha deve conter pelo menos um número."
        });
    });
    
    test('testing ValidatorPassword with valid password', () => {
        const validPassword = 'ValidPass123';
    
        const result = ValidatorPassword(validPassword);
    
        expect(result).toBeTruthy();
    });
});


describe('Creating User In UseCase',  ()=>{
    let clientUseCase: ClientUseCase;
    let mockUserRepository: IUserRepository; 
    beforeEach(()=>{
        mockUserRepository = MockUserRepository
        clientUseCase = new ClientUseCase(mockUserRepository)
    })
    test('testing Created User', async  ()=>{

        const CreatedUser: ClientDTO = {
            email: 'test123@gmail.com',
            cpf: '75593360600',
            name: 'thiago',
            password: 'Tmp123456'
        }
        await clientUseCase.create(CreatedUser);

        expect(mockUserRepository.create).toHaveBeenCalled()
      

    })
})