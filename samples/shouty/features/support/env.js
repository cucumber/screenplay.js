process.env.NODE_ENV = 'cucumber'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('ts-node').register({
  extends: __dirname + '/../../tsconfig.json',
  transpileOnly: true,
})
