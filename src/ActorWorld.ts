import Actor from './Actor'
import { defineParameterType } from '@cucumber/cucumber'

export default class ActorWorld {
  private readonly actorByName = new Map<string, Actor>()

  findOrCreateActor(actorName: string): Actor {
    let actor = this.actorByName.get(actorName)

    if (actor === undefined) {
      actor = new Actor(this, actorName)
      this.actorByName.set(actorName, actor)
    }

    return actor
  }

  static defineActorParameterType(name = 'actor', regexp = /[A-Z][a-z]+/) {
    defineParameterType({
      name,
      regexp,
      transformer(this: ActorWorld, actorName: string) {
        return this.findOrCreateActor(actorName)
      },
    })
  }
}

