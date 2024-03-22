import { Either } from '@/utils/either';

import { EntityError } from '../../errors/entity-error';
import { RequiredFieldError } from '../../errors/required-field-error';

export const validateRequiredFields = (
  either: Either<EntityError, any>,
  object: any,
  requiredFields: string[],
) => {
  const validateFieldRecursively = (field: string, parents: string[]): void => {
    const [parent, ...childs] = field.split('.');
    const fieldIsObject = childs?.length > 0;

    parents.push(parent);

    if (fieldIsObject)
      return validateFieldRecursively(childs.join('.'), parents);

    const value = parents.reduce((p, c) => p?.[c], object);

    if (Array.isArray(value) && !value.length)
      either.addError(new RequiredFieldError(parents.join('.')));

    if (value === null || value === undefined || value === '')
      either.addError(new RequiredFieldError(parents.join('.')));
  };

  requiredFields.forEach((field: string) => {
    const parents = [];
    validateFieldRecursively(field, parents);
  });
};
