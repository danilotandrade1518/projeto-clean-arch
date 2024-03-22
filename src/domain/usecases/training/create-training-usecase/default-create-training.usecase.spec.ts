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
import { UserEntity } from '@/entities/user';

interface GetUserRepository {
  get: (id: string) => Promise<UserEntity>;
}
class GetUserRepositorySpy implements GetUserRepository {
  async get(id: string) {
    return UserEntity.create({
      name: 'Danilo Andrade',
      email: 'danilo.andrade@teste.com',
      cpf: '11322627630',
      password: '1234567',
    }).data;
  }
}

class DefaultCreateTrainingUsecase implements ICreateTrainingUsecase {
  constructor(private getUserRepository: GetUserRepository) {}

  async execute(params: CreateTrainingDto) {
    const either = new Either<UsecaseError, ICreateTrainingUsecaseResult>();

    await this.getUserRepository.get(params.user);

    const trainingOrError = TrainingEntity.create(params);

    either.addManyErrors(trainingOrError.errors);

    either.setData({
      id: null,
    });
    return either;
  }
}

const makeSut = () => {
  const getUserRepository = new GetUserRepositorySpy();

  const defaultCreateTrainingUsecase = new DefaultCreateTrainingUsecase(
    getUserRepository,
  );

  return { defaultCreateTrainingUsecase, getUserRepository };
};

describe('DefaultCreateTrainingUsecase', () => {
  it('should be possible create training', async () => {
    const { defaultCreateTrainingUsecase } = makeSut();

    const data = {
      name: 'Training 1',
      description: 'Description of training',
      user: 'user1',
    };

    const result = (await defaultCreateTrainingUsecase.execute(data)).data;

    expect(result.id).toBeDefined();
  });

  it('should call TrainingEntity.create with correct values', async () => {
    const { defaultCreateTrainingUsecase } = makeSut();

    const data = {
      name: 'Training 1',
      description: 'Description of training',
      user: 'user1',
    };

    const trainingEntitySpy = jest.spyOn(TrainingEntity, 'create');

    (await defaultCreateTrainingUsecase.execute(data)).data;

    expect(trainingEntitySpy).toHaveBeenCalledWith(data);
  });

  it('ensure hasError when invalida data are passed to Entity', async () => {
    const { defaultCreateTrainingUsecase } = makeSut();

    const invalidData = {
      name: 'ab',
      description: 'Description of training',
      user: 'user1',
    };

    const result = await defaultCreateTrainingUsecase.execute(invalidData);

    expect(result.hasError).toBeTruthy();
  });

  it('should call getUserRepository with correct values', async () => {
    const { defaultCreateTrainingUsecase, getUserRepository } = makeSut();

    const data = {
      name: 'Training 1',
      description: 'Description of training',
      user: 'user1',
    };

    const getUserRepositorySpy = jest.spyOn(getUserRepository, 'get');

    await defaultCreateTrainingUsecase.execute(data);

    expect(getUserRepositorySpy).toHaveBeenCalledWith(data.user);
  });
});
