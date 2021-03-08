import Actor from './Actor'

export class ActorLookup<World> {
  private readonly actorByName = new Map<string, Actor<World>>()

  findOrCreateActor(world: World, actorName: string): Actor<World> {
    let actor = this.actorByName.get(actorName)

    if (actor === undefined) {
      actor = new Actor<World>(world, actorName)
      this.actorByName.set(actorName, actor)
    }

    return actor
  }
}

export default class ActorWorld {
  private readonly actorLookUp = new ActorLookup()

  findOrCreateActor(actorName: string): Actor<any> {
    return this.actorLookUp.findOrCreateActor(this, actorName)
  }
}