import Actor from './Actor'

export default class ActorLookup {
  private readonly actorByName = new Map<string, Actor>()

  public findOrCreateActor(world: unknown, actorName: string): Actor {
    let actor = this.actorByName.get(actorName)

    if (actor === undefined) {
      actor = new Actor(world, actorName)
      this.actorByName.set(actorName, actor)
    }

    return actor
  }

  public get actors(): IterableIterator<Actor> {
    return this.actorByName.values()
  }
}
