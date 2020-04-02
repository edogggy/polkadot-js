// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  browser: true,
  moduleNameMapper: {
    '@polkadot/extension-(base|chains|dapp|inject|ui)(.*)$': '<rootDir>/packages/extension-$1/src/$2',
    // eslint-disable-next-line sort-keys
    '@polkadot/extension(.*)$': '<rootDir>/packages/extension/src/$1',
    '\\.(css|less)$': 'empty/object',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/extension/build',
    '<rootDir>/packages/extension-ui/build',
    '<rootDir>/packages/extension-chains/build',
    '<rootDir>/packages/extension-inject/build',
    '<rootDir>/packages/extension-dapp/build'
  ]
});
