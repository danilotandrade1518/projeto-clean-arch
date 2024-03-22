import { Either } from '@/utils/either';
import { IEntity } from '../entity';
import { EntityError } from '../shared/errors/entity-error';

class TrainingEntity implements IEntity {
  private _id: string;

  get id(): string {
    return this._id;
  }

  static create(data: any): Either<EntityError, TrainingEntity> {
    const either = new Either<EntityError, TrainingEntity>();

    either.setData(new TrainingEntity());
    return either;
  }
}

describe('TrainingEntity', () => {
  it('should be created', () => {
    const trainingEntity = TrainingEntity.create({}).data;

    expect(trainingEntity).toBeDefined();
  });
});
