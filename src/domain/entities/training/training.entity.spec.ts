import { faker } from '@faker-js/faker';

import { InvalidTrainingNameError } from '../shared/errors/invalid-training-name-error';
import { RequiredFieldError } from '../shared/errors/required-field-error';
import { TrainingEntity } from './training.entity';

describe('TrainingEntity', () => {
  it('should be created', () => {
    const data = {
      name: 'Training 1',
      description: 'Description of training',
      user: 'user1',
    };

    const trainingEntity = TrainingEntity.create(data).data;

    expect(trainingEntity.id).toBeDefined();
    expect(trainingEntity.name.value).toEqual(data.name);
    expect(trainingEntity.description).toEqual(data.description);
    expect(trainingEntity.user).toEqual(data.user);
  });

  it('should hasErros when invalid name is provided', () => {
    const data = {
      name: 'ab',
      description: 'Description of training',
      user: 'user1',
    };

    const trainingOrError = TrainingEntity.create(data);

    expect(trainingOrError.errors[0]).toEqual(
      new InvalidTrainingNameError(data.name),
    );
  });

  it('should hasError when user is empty', () => {
    const data = {
      name: 'Training 1',
      description: 'Description of training',
      user: '',
    };

    const trainingOrError = TrainingEntity.create(data);

    expect(trainingOrError.errors[0]).toEqual(new RequiredFieldError('user'));
  });

  it('ensure training is possible to planning', () => {
    const data = {
      name: 'Training 1',
      description: 'Description of training',
      user: 'user1',
    };

    const trainingEntity = TrainingEntity.create(data).data;

    trainingEntity.planning([
      {
        id: 'id',
        startDate: faker.date.future(),
        endDate: faker.date.future(),
        location: 'location 1',
        participants: ['user1'],
      },
    ]);

    expect(trainingEntity.schedules.length).toBe(1);
  });

  it('ensure hasError when planning with invalid schedule', () => {
    const data = {
      name: 'Training 1',
      description: 'Description of training',
      user: 'user1',
    };

    const trainingOrError = TrainingEntity.create(data);

    const trainingEntity = trainingOrError.data;

    const invalidScheduleData = [
      {
        id: 'id',
        startDate: faker.date.past(),
        endDate: faker.date.future(),
        location: 'location 1',
        participants: ['user1'],
      },
    ];

    trainingEntity.planning(invalidScheduleData);

    expect(trainingOrError.hasError).toBeTruthy();
  });
});
