import { CreateTrainingDto } from '@/entities/training/training.entity';
import { IUsecase } from '@/usecases/usecase';

export type ICreateTrainingUsecaseResult = { id: string };

export interface ICreateTrainingUsecase
  extends IUsecase<CreateTrainingDto, ICreateTrainingUsecaseResult> {}
