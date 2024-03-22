export interface IVo<T, I> {
  value: T;
  checkIsValid(value: I): void;
}
