import { Password } from '.';
import { InvalidPasswordError } from '../../errors/invalid-password-error';

describe('Password VO', () => {
  it('should has error when value length is less than 6', () => {
    const value = '12345';
    expect(() => new Password(value)).toThrow(new InvalidPasswordError(value));
  });

  it('should not has error when value length is greather than 6', () => {
    const value = '1234567';

    const password = new Password(value);

    expect(password.value).toEqual(value);
  });

  it('should not has error when value length is 6', () => {
    const value = '123456';

    const password = new Password(value);

    expect(password.value).toEqual(value);
  });
});
