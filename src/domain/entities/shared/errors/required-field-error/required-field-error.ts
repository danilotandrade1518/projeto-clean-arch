import { EntityError } from '../entity-error';

export class RequiredFieldError extends EntityError {
  name = 'RequiredFieldError';
}
