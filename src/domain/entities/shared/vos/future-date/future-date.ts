import { InvalidDateError } from '../../errors/invalid-date-error';
import { IVo } from '../ivo';

export class FutureDate implements IVo<Date, Date> {
  private readonly date: Date;

  constructor(value: Date) {
    this.checkIsValid(value);

    this.date = value;
  }

  get value(): Date {
    return this.date;
  }

  checkIsValid(value: Date) {
    if (!value) return;

    const compareDate = new Date(value);
    compareDate.setHours(23, 59, 59, 0);

    const today = new Date();
    today.setHours(23, 59, 59, 0);

    const isValid = compareDate.getTime() > today.getTime();
    if (!isValid) throw new InvalidDateError(value.toLocaleString());
  }
}
