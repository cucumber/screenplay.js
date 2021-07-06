import { World, IWorldOptions } from '@cucumber/cucumber'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import Actor from './Actor'
import ActorLookup from './ActorLookup'
import { InteractionLoader, makeInteractionLoader } from './index'

const readdir = promisify(fs.readdir)

export default class ActorWorld extends World {
  public readonly actorLookup = new ActorLookup()
  protected readonly interaction: InteractionLoader

  constructor(props: IWorldOptions) {
    super(props)
    this.interaction = makeInteractionLoader(this.parameters.interactions)
  }

  /**
   * Loads all interactions and assigns them to *this*
   */
  public async loadInteractions(): Promise<void> {
    const files = await readdir(this.parameters.interactions)
    await Promise.all(
      files.map(async (file) => {
        const match = file.match(/(\.ts|\.js|\.tsx|\.jsx)$/)
        if (match) {
          const ext = match[1]
          const name = path.basename(file, ext)
          this[name] = await this.interaction(name)
        }
      })
    )
  }

  public findOrCreateActor(actorName: string): Actor {
    return this.actorLookup.findOrCreateActor(this, actorName)
  }
}
