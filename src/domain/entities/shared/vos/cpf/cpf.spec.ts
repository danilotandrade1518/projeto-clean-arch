import { Cpf } from '.';
import { InvalidCpfError } from '../../errors/invalid-cpf-error';

describe('CPF VO', () => {
  it('should has error when cpf has repeated numbers with mask', () => {
    const value = '111.111.111-11';
    expect(() => new Cpf(value)).toThrow(new InvalidCpfError(value));
  });

  it('should has error when cpf has repeated numbers without mask', () => {
    const value = '11111111111';
    expect(() => new Cpf(value)).toThrow(new InvalidCpfError(value));
  });

  it('should not has error when cpf is valid without mask', () => {
    const value = '81733837078';

    const cpf = new Cpf(value);

    expect(cpf.value).toEqual(value);
  });

  it('should not has error when cpf is valid with mask', () => {
    const value = '817.338.370-78';

    const cpf = new Cpf(value);

    expect(cpf.value).toEqual(value);
  });

  it('should has error when cpf is invalid without mask', () => {
    const value = '81733837079';
    expect(() => new Cpf(value)).toThrow(new InvalidCpfError(value));
  });

  it('should has error when cpf is invalid with mask', () => {
    const value = '817.338.370-79';
    expect(() => new Cpf(value)).toThrow(new InvalidCpfError(value));
  });

  it('should not has error when cpf is empty', () => {
    const value = '';

    const cpf = new Cpf(value);

    expect(cpf.value).toEqual(value);
  });

  it('should not has error when cpf is null', () => {
    const value = null;

    const cpf = new Cpf(value);

    expect(cpf.value).toEqual(value);
  });
});
