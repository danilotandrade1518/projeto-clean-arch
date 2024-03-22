import { TrainingName } from '.';
import { InvalidTrainingNameError } from '../../errors/invalid-training-name-error';

describe('TrainingName VO', () => {
  it('should has error when value length is less than 3', () => {
    const value = '12';
    expect(() => new TrainingName(value)).toThrow(
      new InvalidTrainingNameError(value),
    );
  });

  it('should not has error when value length is greather than 3', () => {
    const value = '1234';

    const trainingName = new TrainingName(value);

    expect(trainingName.value).toEqual(value);
  });

  it('should not has error when value length is 3', () => {
    const value = '123';

    const trainingName = new TrainingName(value);

    expect(trainingName.value).toEqual(value);
  });
});
