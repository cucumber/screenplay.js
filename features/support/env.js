require('ts-node').register({
  extends: __dirname + '/../../tsconfig.json',
  transpileOnly: true,
})
require('source-map-support/register')
