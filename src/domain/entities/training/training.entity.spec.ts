import { Either } from '@/utils/either';
import { IEntity } from '../entity';
import { EntityError } from '../shared/errors/entity-error';
import { randomUUID } from 'crypto';
import { TrainingName } from '../shared/vos/training-name';
import { InvalidTrainingNameError } from '../shared/errors/invalid-training-name-error';
import { RequiredFieldError } from '../shared/errors/required-field-error';
import { faker } from '@faker-js/faker';
import { ScheduleEntity } from '../schedule';

type CreateTrainingDto = {
  name: string;
  description: string;
  user: string;
};

class TrainingEntity implements IEntity {
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

    this._schedules = schedulesOrError.map((schedule) => schedule.data);
  }
}

describe('TrainingEntity', () => {
  it('should be created', () => {
    const data = {
      name: 'Training 1',
      description: 'Description of training',
      user: 'user1',
    };

    const trainingEntity = TrainingEntity.create(data).data;

    expect(trainingEntity.id).toBeDefined();
    expect(trainingEntity.name.value).toEqual(data.name);
    expect(trainingEntity.description).toEqual(data.description);
    expect(trainingEntity.user).toEqual(data.user);
  });

  it('should hasErros when invalid name is provided', () => {
    const data = {
      name: 'ab',
      description: 'Description of training',
      user: 'user1',
    };

    const trainingOrError = TrainingEntity.create(data);

    expect(trainingOrError.errors[0]).toEqual(
      new InvalidTrainingNameError(data.name),
    );
  });

  it('should hasError when user is empty', () => {
    const data = {
      name: 'Training 1',
      description: 'Description of training',
      user: '',
    };

    const trainingOrError = TrainingEntity.create(data);

    expect(trainingOrError.errors[0]).toEqual(new RequiredFieldError('user'));
  });

  it('ensure training is possible to planning', () => {
    const data = {
      name: 'Training 1',
      description: 'Description of training',
      user: 'user1',
    };

    const trainingEntity = TrainingEntity.create(data).data;

    trainingEntity.planning([
      {
        id: 'id',
        startDate: faker.date.future(),
        endDate: faker.date.future(),
        location: 'location 1',
        participants: ['user1'],
      },
    ]);

    expect(trainingEntity.schedules.length).toBe(1);
  });
});
