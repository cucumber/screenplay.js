import { World, IWorldOptions } from '@cucumber/cucumber'
import Actor from './Actor'
import ActorLookup from './ActorLookup'
import assignTasks from './assignTasks'
import asyncAssignTasks from './asyncAssignTasks'

export interface IActorWorldOptions extends IWorldOptions {
  packageType: 'commonjs' | 'module'
}

export default class ActorWorld extends World {
  public readonly actorLookup = new ActorLookup()
  public readonly promise

  constructor(props: IActorWorldOptions) {
    console.log('>>>> ActorWorld', props)
    const { packageType = 'commonjs', ...rest } = props

    super(rest)

    if (packageType == 'commonjs' && this.parameters.tasks) {
      assignTasks(this, this.parameters.tasks)
    }

    if (packageType === 'module' && this.parameters.tasks) {
      this.promise = asyncAssignTasks(this, this.parameters.tasks)
    }
  }

  public findOrCreateActor(actorName: string): Actor {
    return this.actorLookup.findOrCreateActor(this, actorName)
  }
}
