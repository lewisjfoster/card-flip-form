process.env.TZ = 'GMT';

module.exports = {
    moduleNameMapper: {
        '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
        '\\.(jpg|jpeg|png)$': '<rootDir>/mocks/fileMock.js',
        '^.+\\.svg$': '<rootDir>/node_modules/jest-svg-transformer',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
