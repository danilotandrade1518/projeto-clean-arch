import { EntityError } from '../entity-error';

export class InvalidTrainingNameError extends EntityError {
  name = 'InvalidTrainingNameError';
}
