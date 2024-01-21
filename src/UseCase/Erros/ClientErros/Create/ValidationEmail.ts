import { IUserRepository } from '../../../../Repository/Service/UserRepository';

import { ErrorFindByEmail } from '../ErrorsCustomization/Create/ErrorEmailCustomization/ErrorFindByEmail';
import { ErrorValidationEmail } from '../ErrorsCustomization/Create/ErrorEmailCustomization/ValidateEmail';
import { CaracterEmail } from './validator/validatorEmail';


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