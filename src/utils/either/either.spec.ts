import { Either } from '.';

type TestEither = { message: string };

describe('Either util', () => {
  test('get data when errors is empty', async () => {
    const data = {
      message: 'Data',
    };

    const either = new Either<Error, TestEither>();
    either.setData(data);

    expect(either.data).toEqual(data);
  });
  test('has data when errors is empty', async () => {
    const data = {
      message: 'Data',
    };

    const either = new Either<Error, TestEither>();
    either.setData(data);

    expect(either.hasData).toBeTruthy();
  });
  test('get errors when has errors', async () => {
    const error = new Error('Has error');

    const either = new Either<Error, TestEither>();
    either.addError(error);

    expect(either.errors).toEqual([error]);
  });
  test('get errors when errors is empty', async () => {
    const either = new Either<Error, TestEither>();
    expect(either.errors.length).toEqual(0);
  });
  test('has error when errors is empty', async () => {
    const either = new Either<Error, TestEither>();
    expect(either.hasError).toBeFalsy();
  });
});
