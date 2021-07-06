import { World } from '@cucumber/cucumber'
import Actor from './Actor'
import ActorLookup from './ActorLookup'
import { InteractionLoader, makeInteractionLoader } from './index'
import { IWorldOptions } from '@cucumber/cucumber/lib/support_code_library_builder/world'

export default class ActorWorld extends World {
  public readonly actorLookup = new ActorLookup()
  protected readonly interaction: InteractionLoader

  constructor(props: IWorldOptions) {
    super(props)
    this.interaction = makeInteractionLoader(props.parameters.interactions)
  }

  public findOrCreateActor(actorName: string): Actor {
    return this.actorLookup.findOrCreateActor(this, actorName)
  }
}
