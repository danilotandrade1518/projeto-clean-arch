import { EntityError } from '../entity-error';

export class InvalidPasswordError extends EntityError {
  name = 'InvalidPasswordError';
}
