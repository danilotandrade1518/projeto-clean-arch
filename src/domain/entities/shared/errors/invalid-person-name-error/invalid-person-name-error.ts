import { EntityError } from '../entity-error';

export class InvalidPersonNameError extends EntityError {
  name = 'InvalidPersonNameError';
}
