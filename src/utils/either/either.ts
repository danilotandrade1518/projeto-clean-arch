export class Either<E, D> {
  private _data: D | undefined;
  private _errors: E[] = [];

  addError(error: E) {
    this._errors.push(error);
  }

  addManyErrors(errors: E[]) {
    errors.forEach((error) => this.addError(error));
  }

  setData(data: D) {
    this._data = data;
  }

  get hasError(): boolean {
    return this._errors.length > 0;
  }

  get hasData(): boolean {
    return Boolean(this._data);
  }

  get data() {
    if (!this.hasData) return null;

    return this._data;
  }

  get errors() {
    return this._errors;
  }
}
