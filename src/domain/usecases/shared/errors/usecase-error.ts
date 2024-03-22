import { DomainError } from '../../../shared/errors/domain-error';

export abstract class UsecaseError extends DomainError {
  abstract name: string;

  constructor(value: string) {
    super(`${value} is invalid`);
  }

  get errorObj() {
    return {
      error: this.name,
      message: this.message,
    };
  }
}
