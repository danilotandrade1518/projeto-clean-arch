import { Either } from '@/utils/either';

import { UsecaseError } from './shared/errors/usecase-error';

export interface IUsecase<I, R> {
  execute: (params: I) => Promise<Either<UsecaseError, R>>;
}
