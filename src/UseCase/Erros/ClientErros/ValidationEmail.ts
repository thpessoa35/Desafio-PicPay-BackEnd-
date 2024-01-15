import { IUserRepository } from '../../../Repository/Service/UserRepository';
import { CaracterEmail } from '../../Client/validator/validatorEmail';
import { ErrorFindByEmail } from './ErrorsCustomization/ErrorEmailCustomization/ErrorFindByEmail';
import { ErrorValidationEmail } from './ErrorsCustomization/ErrorEmailCustomization/ValidateEmail';

export class EmailValidation {
  private iUserRepository: IUserRepository;

  constructor(iUserRepository: IUserRepository) {
    this.iUserRepository = iUserRepository;
  }

  async validate(email: string): Promise<void> {
    const existingEmail = await this.iUserRepository.findbyEmail(email);

    if (existingEmail) {
      throw new ErrorFindByEmail();
    }
    
    if (!CaracterEmail(email)) {
      throw new ErrorValidationEmail()
    }
  }
}