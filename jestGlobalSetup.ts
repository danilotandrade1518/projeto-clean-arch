import * as dotenv from 'dotenv';

export default async () => {
  dotenv.config({ path: `${__dirname}/.env.test` });

  return {
    rootDir: '.',
    moduleFileExtensions: ['js', 'json', 'ts'],
    testEnvironment: 'node',
  };
};
