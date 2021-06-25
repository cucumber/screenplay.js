import Actor from './Actor'
import ActorLookup from './ActorLookup'

export default class ActorWorld {
  private readonly actorLookup = new ActorLookup()

  findOrCreateActor(actorName: string): Actor {
    return this.actorLookup.findOrCreateActor(this, actorName)
  }
}
