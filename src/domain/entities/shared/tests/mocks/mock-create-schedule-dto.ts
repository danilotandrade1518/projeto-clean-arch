import { CreateScheduleDto } from '@/entities/schedule';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

export const mockCreateScheduleDto = (): CreateScheduleDto => {
  const startDate = faker.date.future();

  return {
    startDate,
    endDate: faker.date.future({ refDate: startDate }),
    location: faker.location.city(),
    participants: [randomUUID()],
    training: randomUUID(),
  };
};
