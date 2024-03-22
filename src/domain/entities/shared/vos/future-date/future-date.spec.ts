import { FutureDate } from '.';
import { InvalidDateError } from '../../errors/invalid-date-error';

describe('FutureDate VO', () => {
  it('should hasError when value is now', () => {
    const value = new Date();
    expect(() => new FutureDate(value)).toThrow(
      new InvalidDateError(value.toLocaleString()),
    );
  });

  it('should hasError when value is less than now', () => {
    const value = new Date();
    value.setDate(value.getDate() - 1);

    expect(() => new FutureDate(value)).toThrow(
      new InvalidDateError(value.toLocaleString()),
    );
  });

  it('should not hasError when value is greather than now', () => {
    const value = new Date();
    value.setDate(value.getDate() + 1);

    const futureDate = new FutureDate(value);

    expect(futureDate.value).toEqual(value);
  });
});
