import { AfterDate } from '.';
import { InvalidDateError } from '../../errors/invalid-date-error';

describe('AfterDate VO', () => {
  it('should hasError when value is equal compareDate', () => {
    const value = new Date();
    const compareDate = new Date();

    expect(() => new AfterDate({ value, compareDate })).toThrow(
      new InvalidDateError(value.toLocaleString()),
    );
  });

  it('should hasError when value is less than compareDate', () => {
    const value = new Date();
    value.setDate(value.getDate() - 1);

    const compareDate = new Date();

    expect(() => new AfterDate({ value, compareDate })).toThrow(
      new InvalidDateError(value.toLocaleString()),
    );
  });

  it('should not hasError when value is greather than compareDate', () => {
    const value = new Date();
    value.setDate(value.getDate() + 1);

    const compareDate = new Date();

    const afterDate = new AfterDate({ value, compareDate });

    expect(afterDate.value).toEqual(value);
  });
});
