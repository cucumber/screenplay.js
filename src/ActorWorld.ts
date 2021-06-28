import Actor from './Actor'
import ActorLookup from './ActorLookup'
import { Stop } from './Stop'

export default class ActorWorld {
  public readonly actorLookup = new ActorLookup()
  public readonly stops: Stop[] = []

  findOrCreateActor(actorName: string): Actor {
    return this.actorLookup.findOrCreateActor(this, actorName)
  }

  async stop(): Promise<void> {
    await Promise.all(this.stops.reverse().map((stop) => stop()))
  }
}
