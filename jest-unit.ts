import { MongoMemoryServer } from 'mongodb-memory-server';

import { jestModuleNameMapper } from './module-name-mapper';

export default async () => {
  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  process.env.MONGO_URL = mongoUri;

  return {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    testRegex: '.*\\.spec\\.ts$',
    globalSetup: './jestGlobalSetup.ts',
    moduleNameMapper: jestModuleNameMapper,
    testTimeout: 20000,
  };
};
