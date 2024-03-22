import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

import { CreateScheduleDto, ScheduleEntity } from '.';
import { InvalidDateError } from '../shared/errors/invalid-date-error';

const mockCreateScheduleDto = (): CreateScheduleDto => {
  const startDate = faker.date.future();

  return {
    startDate,
    endDate: faker.date.future({ refDate: startDate }),
    location: faker.location.city(),
    participants: [randomUUID()],
    training: randomUUID(),
  };
};

describe('Schedule Entity', () => {
  it('should create schedule entity', () => {
    const data = mockCreateScheduleDto();
    const schedule = ScheduleEntity.create(data).data;

    expect(schedule.id).toBeDefined();
    expect(schedule.startDate.value).toEqual(data.startDate);
    expect(schedule.endDate.value).toEqual(data.endDate);
    expect(schedule.location).toEqual(data.location);
    expect(schedule.participants).toEqual(data.participants);
  });

  it('should hasError when invalid start date', () => {
    const data = mockCreateScheduleDto();
    data.startDate = faker.date.past();

    const scheduleEntityOrError = ScheduleEntity.create(data);

    expect(scheduleEntityOrError.errors[0]).toEqual(
      new InvalidDateError(data.startDate.toLocaleString()),
    );
  });

  it('should hasError when end date is before startDate', () => {
    const data = mockCreateScheduleDto();
    data.endDate = faker.date.past({ refDate: data.startDate });

    const scheduleEntityOrError = ScheduleEntity.create(data);

    expect(scheduleEntityOrError.errors[0]).toEqual(
      new InvalidDateError(data.endDate.toLocaleString()),
    );
  });
});
