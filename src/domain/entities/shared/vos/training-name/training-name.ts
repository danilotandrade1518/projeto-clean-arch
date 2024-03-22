import { InvalidTrainingNameError } from '../../errors/invalid-training-name-error';
import { IVo } from '../ivo';

export class TrainingName implements IVo<string, string> {
  private readonly trainingName: string;
  private readonly minLength = 3;

  constructor(value: string) {
    this.checkIsValid(value);

    this.trainingName = value;
  }

  get value(): string {
    return this.trainingName;
  }

  checkIsValid(value: string) {
    if (!value) return;

    const isValid = value.length >= this.minLength;

    if (!isValid) throw new InvalidTrainingNameError(value);
  }
}
