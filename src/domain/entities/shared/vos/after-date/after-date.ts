import { InvalidDateError } from '../../errors/invalid-date-error';
import { IVo } from '../ivo';

export type AfterDateParams = {
  value: Date;
  compareDate: Date;
};

export class AfterDate implements IVo<Date, AfterDateParams> {
  private readonly date: Date;

  constructor(value: AfterDateParams) {
    this.checkIsValid(value);

    this.date = value.value;
  }

  get value(): Date {
    return this.date;
  }

  checkIsValid(params: AfterDateParams) {
    if (!params) return;

    const valueDate = new Date(params.value);
    valueDate.setHours(23, 59, 59, 0);

    params.compareDate.setHours(23, 59, 59, 0);

    const isValid = valueDate.getTime() > params.compareDate.getTime();
    if (!isValid) throw new InvalidDateError(params.value.toLocaleString());
  }
}
