import { World, IWorldOptions } from '@cucumber/cucumber'
import Actor from './Actor'
import ActorLookup from './ActorLookup'
import assignInteractions from './assignInteractions'

export default class ActorWorld extends World {
  public readonly actorLookup = new ActorLookup()

  constructor(props: IWorldOptions) {
    super(props)
    if (this.parameters.interactions) {
      assignInteractions(this, this.parameters.interactions)
    }
  }

  public findOrCreateActor(actorName: string): Actor {
    return this.actorLookup.findOrCreateActor(this, actorName)
  }
}
