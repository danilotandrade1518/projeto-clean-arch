import { Either } from '@/utils/either';
import { randomUUID } from 'crypto';

import { IEntity } from '../entity';
import { EntityError } from '../shared/errors/entity-error';
import { AfterDate } from '../shared/vos/after-date';
import { FutureDate } from '../shared/vos/future-date';

export type CreateScheduleDto = {
  startDate: Date;
  endDate: Date;
  location: string;
  participants: string[];
  training: string;
};

export class ScheduleEntity implements IEntity {
  private _id: string;
  private _startDate: FutureDate;
  private _endDate: AfterDate;
  private _location: string;
  private _participants: string[];
  private _training: string;

  private constructor(
    either: Either<EntityError, ScheduleEntity>,
    startDate: Date,
    endDate: Date,
    location: string,
    participants: string[],
    training: string,
  ) {
    this._id = randomUUID();

    try {
      this._startDate = new FutureDate(startDate);
    } catch (error) {
      either.addError(error);
    }

    try {
      this._endDate = new AfterDate({ value: endDate, compareDate: startDate });
    } catch (error) {
      either.addError(error);
    }

    this._location = location;
    this._participants = participants;
    this._training = training;
  }

  get id(): string {
    return this._id;
  }
  get startDate(): FutureDate {
    return this._startDate;
  }
  get endDate(): AfterDate {
    return this._endDate;
  }
  get location(): string {
    return this._location;
  }
  get participants(): string[] {
    return this._participants;
  }
  get training(): string {
    return this._training;
  }

  static create(data: CreateScheduleDto): Either<EntityError, ScheduleEntity> {
    const either = new Either<EntityError, ScheduleEntity>();

    const scheduleEntity = new ScheduleEntity(
      either,
      data.startDate,
      data.endDate,
      data.location,
      data.participants,
      data.training,
    );

    either.setData(scheduleEntity);

    return either;
  }
}
