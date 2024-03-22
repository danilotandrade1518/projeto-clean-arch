import { CreateUserDto } from '@/entities/user';
import { faker } from '@faker-js/faker';

export const mockCreateUserDto = (): CreateUserDto => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  cpf: '11322627630',
  password: faker.internet.password(),
});
