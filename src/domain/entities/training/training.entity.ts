import { Either } from '@/utils/either';
import { randomUUID } from 'crypto';

import { IEntity } from '../entity';
import { ScheduleEntity } from '../schedule';
import { EntityError } from '../shared/errors/entity-error';
import { RequiredFieldError } from '../shared/errors/required-field-error';
import { TrainingName } from '../shared/vos/training-name';

export type CreateTrainingDto = {
  name: string;
  description: string;
  user: string;
};

export class TrainingEntity implements IEntity {
  private _either: Either<EntityError, TrainingEntity>;
  private _id: string;
  private _name: TrainingName;
  private _description: string;
  private _user: string;
  private _schedules: ScheduleEntity[];

  constructor(
    either: Either<EntityError, TrainingEntity>,
    name: string,
    description: string,
    user: string,
  ) {
    this._either = either;

    this._id = randomUUID();

    if (!user) either.addError(new RequiredFieldError('user'));

    try {
      this._name = new TrainingName(name);
    } catch (error) {
      either.addError(error);
    }

    this._description = description;
    this._user = user;
  }

  get id(): string {
    return this._id;
  }
  get name(): TrainingName {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get user(): string {
    return this._user;
  }
  get schedules(): ScheduleEntity[] {
    return this._schedules;
  }

  static create(data: CreateTrainingDto): Either<EntityError, TrainingEntity> {
    const either = new Either<EntityError, TrainingEntity>();

    either.setData(
      new TrainingEntity(either, data.name, data.description, data.user),
    );
    return either;
  }

  planning(schedules: any[]): void {
    const schedulesOrError = schedules.map((schedule) =>
      ScheduleEntity.create(schedule),
    );

    schedulesOrError.forEach((scheduleOrError) =>
      this._either.addManyErrors(scheduleOrError.errors),
    );

    this._schedules = schedulesOrError.map((schedule) => schedule.data);
  }
}
