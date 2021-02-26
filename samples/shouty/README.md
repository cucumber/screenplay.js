# Shouty

This is a TypeScript port of [Shouty.js](https://github.com/cucumber-ltd/shouty.js) using [@cucumber/screenplay](https://github.com/cucumber/screenplay.js).

The scenarios can be executed in two ways:
 - `npm run test`: this will interact with the typescript functions directly
 - `SHOUTY_HTTP_ADAPTERS=1 npm run test`: the scenarios will interact with Shouty at the HTTP layer