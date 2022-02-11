import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => ({
    verbose: true,
    detectOpenHandles: true,
    detectLeaks: true,
    moduleFileExtensions: [
        'js',
        'json',
        'ts',
    ],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    coveragePathIgnorePatterns: [
        'enviroments.d.ts',
        '**/test/utils/*.ts',
    ],
    collectCoverageFrom: [
        '**/*.ts',
    ],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
});
