export const jestModuleNameMapper = {
  '^@/adapters/(.*)$': ['<rootDir>/src/adapters/$1'],
  '^@/auth/(.*)$': ['<rootDir>/src/auth/$1'],
  '^@/entities/(.*)$': ['<rootDir>/src/domain/entities/$1'],
  '^@/domain/(.*)$': ['<rootDir>/src/domain/$1'],
  '^@/infra/(.*)$': ['<rootDir>/src/infra/$1'],
  '^@/nest/(.*)$': ['<rootDir>/src/nest/$1'],
  '^@/usecases/(.*)$': ['<rootDir>/src/domain/usecases/$1'],
  '^@/utils/(.*)$': ['<rootDir>/src/utils/$1'],
};
