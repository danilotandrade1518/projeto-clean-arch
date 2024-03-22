import { InvalidEmailError } from '../../errors/invalid-email-error';
import { IVo } from '../ivo';

export class Email implements IVo<string, string> {
  private readonly email: string;

  constructor(value: string) {
    this.checkIsValid(value);

    this.email = value;
  }

  get value(): string {
    return this.email;
  }

  checkIsValid(value: string) {
    if (!value) return;

    const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const isValid = regex.test(value);
    if (!isValid) throw new InvalidEmailError(value);
  }
}
