import { faker } from '@faker-js/faker';

import { Email } from '.';
import { InvalidEmailError } from '../../errors/invalid-email-error';

describe('Email VO', () => {
  it('should hasError when use invalid e-mail', () => {
    const value = 'email.email';
    expect(() => new Email(value)).toThrow(new InvalidEmailError(value));
  });

  it('should validate e-mail when use valid e-mail', () => {
    const value = faker.internet.email();

    const email = new Email(value);

    expect(email.value).toEqual(value);
  });

  it('should validate e-mail when use null e-mail', () => {
    const value = null;

    const email = new Email(value);

    expect(email.value).toEqual(value);
  });
});
