import { mockCreateUserDto } from '@/entities/shared/tests/mocks/mock-create-user-dto';

import { UserEntity } from '.';
import { InvalidCpfError } from '../shared/errors/invalid-cpf-error';
import { InvalidEmailError } from '../shared/errors/invalid-email-error';
import { InvalidPasswordError } from '../shared/errors/invalid-password-error';
import { InvalidPersonNameError } from '../shared/errors/invalid-person-name-error';

describe('User Entity', () => {
  it('should create user entity', () => {
    const data = mockCreateUserDto();
    const user = UserEntity.create(data).data;

    expect(user.id).toBeTruthy();
    expect(user.name.value).toEqual(data.name);
    expect(user.email.value).toEqual(data.email);
    expect(user.cpf.value).toEqual(data.cpf);
    expect(user.password.value).toEqual(data.password);
  });

  it('ensure hasError when name contains only 1 word', () => {
    const data = mockCreateUserDto();
    data.name = 'danilo';

    const userOrError = UserEntity.create(data);

    expect(userOrError.errors[0]).toEqual(
      new InvalidPersonNameError(data.name),
    );
  });

  it('ensure hasError when email is invalid', () => {
    const data = mockCreateUserDto();
    data.email = 'any_invalid_email';

    const userOrError = UserEntity.create(data);

    expect(userOrError.errors[0]).toEqual(new InvalidEmailError(data.email));
  });

  it('ensure hasError when cpf is invalid', () => {
    const data = mockCreateUserDto();
    data.cpf = 'any_invalid_cpf';

    const userOrError = UserEntity.create(data);

    expect(userOrError.errors[0]).toEqual(new InvalidCpfError(data.cpf));
  });

  it('ensure hasError when password is invalid', () => {
    const data = mockCreateUserDto();
    data.password = '12345';

    const userOrError = UserEntity.create(data);

    expect(userOrError.errors[0]).toEqual(
      new InvalidPasswordError(data.password),
    );
  });
});
