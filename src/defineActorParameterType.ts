import { defineParameterType } from '@cucumber/cucumber'
import ActorWorld from './ActorWorld'

export default function defineActorParameterType({ name = 'actor', regexp = /[A-Z][a-z]+/ } = {}) {
  defineParameterType({
    name,
    regexp,
    transformer(this: ActorWorld, actorName: string) {
      return this.findOrCreateActor(actorName)
    },
  })
}
