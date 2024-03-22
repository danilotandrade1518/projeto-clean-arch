import { InvalidCpfError } from '../../errors/invalid-cpf-error';
import { IVo } from '../ivo';

export class Cpf implements IVo<string, string> {
  private readonly BLOCKLIST: Array<string> = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '12345678909',
  ];

  private readonly cpf: string;

  constructor(value: string) {
    this.checkIsValid(value);

    this.cpf = value;
  }

  get value(): string {
    return this.cpf;
  }

  checkIsValid(value: string) {
    if (!value) return;

    const strippedValue = value?.replace(/[^\d]+/g, '');

    if (!strippedValue) throw new InvalidCpfError(value);

    if (strippedValue.length !== 11) throw new InvalidCpfError(value);

    if (this.BLOCKLIST.includes(strippedValue))
      throw new InvalidCpfError(value);

    let numbers: string = strippedValue.substring(0, 9);
    numbers += this.verifierDigit(numbers);
    numbers += this.verifierDigit(numbers);

    const isValid = numbers.substring(-2) === strippedValue.substring(-2);

    if (!isValid) throw new InvalidCpfError(value);
  }

  private verifierDigit(digits: string): number {
    const numbers: Array<number> = digits.split('').map((number) => {
      return parseInt(number, 10);
    });

    const modulus: number = numbers.length + 1;
    const multiplied: Array<number> = numbers.map(
      (number, index) => number * (modulus - index),
    );
    const mod: number =
      multiplied.reduce((buffer, number) => buffer + number) % 11;

    return mod < 2 ? 0 : 11 - mod;
  }
}
