import { EntityError } from '../entity-error';

export class InvalidEmailError extends EntityError {
  name = 'InvalidEmailError';
}
