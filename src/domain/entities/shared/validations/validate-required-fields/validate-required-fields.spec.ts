import { Either } from '@/utils/either';

import { validateRequiredFields } from '.';
import { EntityError } from '../../errors/entity-error';
import { RequiredFieldError } from '../../errors/required-field-error';

describe('ValidateRequiredFields', () => {
  it('should hasError when invalid params are passed', () => {
    const either = new Either<EntityError, any>();

    validateRequiredFields(either, { field1: '', field2: null }, [
      'field1',
      'field2',
      'field3',
    ]);

    expect(either.hasError).toBeTruthy();
    expect(either.errors).toEqual([
      new RequiredFieldError('field1'),
      new RequiredFieldError('field2'),
      new RequiredFieldError('field3'),
    ]);
  });

  it('should not hasError when valid params are passed', () => {
    const either = new Either<EntityError, any>();

    validateRequiredFields(
      either,
      { field1: 'value1', field2: { nested: { nested2: 'value2' } } },
      ['field1', 'field2.nested.nested2'],
    );

    expect(either.hasError).toBeFalsy();
  });

  it('should not hasError when params = 0 are passed', () => {
    const either = new Either<EntityError, any>();

    validateRequiredFields(either, { field1: 0 }, ['field1']);

    expect(either.hasError).toBeFalsy();
  });

  it('should hasError when invalid nested params are passed', () => {
    const either = new Either<EntityError, any>();

    validateRequiredFields(either, { nested1: {} }, ['nested1.nested2']);

    expect(either.hasError).toBeTruthy();
    expect(either.errors).toEqual([new RequiredFieldError('nested1.nested2')]);
  });

  it('should hasError when invalid empty array params are passed', () => {
    const either = new Either<EntityError, any>();

    validateRequiredFields(either, { nested1: [] }, ['nested1']);

    expect(either.hasError).toBeTruthy();
    expect(either.errors).toEqual([new RequiredFieldError('nested1')]);
  });
});
