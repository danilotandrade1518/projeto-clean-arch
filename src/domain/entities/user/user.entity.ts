import { Either } from '@/utils/either';
import { randomUUID } from 'crypto';

import { IEntity } from '../entity';
import { EntityError } from '../shared/errors/entity-error';
import { Cpf } from '../shared/vos/cpf';
import { Email } from '../shared/vos/email';
import { Password } from '../shared/vos/password';
import { PersonName } from '../shared/vos/person-name';

export type CreateUserDto = {
  name: string;
  email: string;
  cpf: string;
  password: string;
};

export class UserEntity implements IEntity {
  private _id: string;
  private _name: PersonName;
  private _email: Email;
  private _cpf: Cpf;
  private _password: Password;

  private constructor(
    either: Either<EntityError, UserEntity>,
    name: string,
    email: string,
    cpf: string,
    password: string,
  ) {
    this._id = randomUUID();

    try {
      this._name = new PersonName(name);
    } catch (error) {
      either.addError(error);
    }

    try {
      this._email = new Email(email);
    } catch (error) {
      either.addError(error);
    }

    try {
      this._cpf = new Cpf(cpf);
    } catch (error) {
      either.addError(error);
    }

    try {
      this._password = new Password(password);
    } catch (error) {
      either.addError(error);
    }
  }

  get id(): string {
    return this._id;
  }
  get name(): PersonName {
    return this._name;
  }
  get email(): Email {
    return this._email;
  }
  get cpf(): Cpf {
    return this._cpf;
  }
  get password(): Password {
    return this._password;
  }

  static create(data: CreateUserDto) {
    const either = new Either<EntityError, UserEntity>();

    const userEntity = new UserEntity(
      either,
      data.name,
      data.email,
      data.cpf,
      data.password,
    );

    either.setData(userEntity);

    return either;
  }
}
