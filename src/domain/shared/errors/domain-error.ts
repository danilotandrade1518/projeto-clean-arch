export type DomainErrorObj = {
  error: string;
  message: string;
  extras?: any;
};

export abstract class DomainError extends Error {
  protected fieldName: string;
  abstract get errorObj(): DomainErrorObj;
}
