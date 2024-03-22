import { PersonName } from '.';
import { InvalidPersonNameError } from '../../errors/invalid-person-name-error';

describe('PersonName VO', () => {
  it('should has error when value has 1 word', () => {
    const value = 'danilo';
    expect(() => new PersonName(value)).toThrow(
      new InvalidPersonNameError(value),
    );
  });

  it('should not has error when value has more 1 word', () => {
    const value = 'danilo andrade';

    const personName = new PersonName(value);

    expect(personName.value).toEqual(value);
  });
});
