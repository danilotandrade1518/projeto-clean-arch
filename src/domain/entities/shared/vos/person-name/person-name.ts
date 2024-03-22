import { InvalidPersonNameError } from '../../errors/invalid-person-name-error';
import { IVo } from '../ivo';

export class PersonName implements IVo<string, string> {
  private readonly personName: string;

  constructor(value: string) {
    this.checkIsValid(value);

    this.personName = value;
  }

  get value(): string {
    return this.personName;
  }

  checkIsValid(value: string) {
    if (!value) return;

    const isValid = value.split(' ').length > 1;

    if (!isValid) throw new InvalidPersonNameError(value);
  }
}
