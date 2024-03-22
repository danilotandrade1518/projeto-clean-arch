import {
  CreateTrainingDto,
  TrainingEntity,
} from '@/entities/training/training.entity';
import { UsecaseError } from '@/usecases/shared/errors/usecase-error';
import { Either } from '@/utils/either';

import {
  ICreateTrainingUsecase,
  ICreateTrainingUsecaseResult,
} from './create-training-usecase';

class DefaultCreateTrainingUsecase implements ICreateTrainingUsecase {
  async execute(params: CreateTrainingDto) {
    const either = new Either<UsecaseError, ICreateTrainingUsecaseResult>();

    TrainingEntity.create(params);

    either.setData({
      id: null,
    });
    return either;
  }
}

describe('DefaultCreateTrainingUsecase', () => {
  it('should be possible create training', async () => {
    const createTrainingUsecase = new DefaultCreateTrainingUsecase();

    const data = {
      name: 'Training 1',
      description: 'Description of training',
      user: 'user1',
    };

    const result = (await createTrainingUsecase.execute(data)).data;

    expect(result.id).toBeDefined();
  });

  it('should call TrainingEntity.create with correct values', async () => {
    const createTrainingUsecase = new DefaultCreateTrainingUsecase();

    const data = {
      name: 'Training 1',
      description: 'Description of training',
      user: 'user1',
    };

    const trainingEntitySpy = jest.spyOn(TrainingEntity, 'create');

    (await createTrainingUsecase.execute(data)).data;

    expect(trainingEntitySpy).toHaveBeenCalledWith(data);
  });
});
