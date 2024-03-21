import { jestModuleNameMapper } from './module-name-mapper';

export default async () => {
  return {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    testRegex: '.e2e-spec.ts$',
    globalSetup: './jestGlobalSetup.ts',
    moduleNameMapper: jestModuleNameMapper,
    testTimeout: 20000,
  };
};
