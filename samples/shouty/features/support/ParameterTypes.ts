import { defineParameterType } from '@cucumber/cucumber'
import World from './World'

defineParameterType({
  name: 'actor',
  regexp: /[A-Z][a-z]+/,
  transformer(this: World, actorName: string) {
    return this.findOrCreateActor(actorName)
  },
})