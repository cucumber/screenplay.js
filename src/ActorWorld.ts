import { World, IWorldOptions } from '@cucumber/cucumber'
import Actor from './Actor'
import ActorLookup from './ActorLookup'
import assignTasks from './assignTasks'

export default class ActorWorld extends World {
  public readonly actorLookup = new ActorLookup()

  constructor(props: IWorldOptions) {
    super(props)
    if (this.parameters.tasks) {
      assignTasks(this, this.parameters.tasks)
    }
  }

  public findOrCreateActor(actorName: string): Actor {
    return this.actorLookup.findOrCreateActor(this, actorName)
  }
}
