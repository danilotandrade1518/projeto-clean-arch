import { CreateTrainingDto } from '@/entities/training/training.entity';
import { UsecaseError } from '@/usecases/shared/errors/usecase-error';
import { Either } from '@/utils/either';

import {
  ICreateTrainingUsecase,
  ICreateTrainingUsecaseResult,
} from './create-training-usecase';

class DefaultCreateTrainingUsecase implements ICreateTrainingUsecase {
  async execute(params: CreateTrainingDto) {
    const either = new Either<UsecaseError, ICreateTrainingUsecaseResult>();

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
});
