import { Either } from '@/utils/either';
import { IEntity } from '../entity';
import { EntityError } from '../shared/errors/entity-error';
import { randomUUID } from 'crypto';

type CreateTrainingDto = {
  name: string;
  description: string;
  user: string;
};

class TrainingEntity implements IEntity {
  private _id: string;
  private _name: string;
  private _description: string;
  private _user: string;

  constructor(name: string, description: string, user: string) {
    this._id = randomUUID();
    this._name = name;
    this._description = description;
    this._user = user;
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get user(): string {
    return this._user;
  }

  static create(data: CreateTrainingDto): Either<EntityError, TrainingEntity> {
    const either = new Either<EntityError, TrainingEntity>();

    either.setData(new TrainingEntity(data.name, data.description, data.user));
    return either;
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
    expect(trainingEntity.name).toEqual(data.name);
    expect(trainingEntity.description).toEqual(data.description);
    expect(trainingEntity.user).toEqual(data.user);
  });
});
