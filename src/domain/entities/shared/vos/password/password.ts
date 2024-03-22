import { InvalidPasswordError } from '../../errors/invalid-password-error';
import { IVo } from '../ivo';

export class Password implements IVo<string, string> {
  private readonly password: string;
  private readonly minLength = 6;

  constructor(value: string) {
    this.checkIsValid(value);

    this.password = value;
  }

  get value(): string {
    return this.password;
  }

  checkIsValid(value: string) {
    if (!value) return;

    const isValid = value.length >= this.minLength;

    if (!isValid) throw new InvalidPasswordError(value);
  }
}
