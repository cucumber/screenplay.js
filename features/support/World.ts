import { setWorldConstructor, Before, After } from '@cucumber/cucumber'
import { AppElements } from '@cucumber/electron'
import { ActorWorld, makeInteractionLoader } from '../../src/index'

import Shouty from '../src/Shouty'
import { makeApp } from '../src/server'
import shoutyHttpAdapters from './helpers/shoutyHttpAdapters'
import { promisify } from 'util'
import { MessagesHeard, MoveTo, Shout } from './interactions/types'

let interactionsDir: string
if (process.env.SHOUTY_DOM_INTERACTIONS) {
  interactionsDir = `${__dirname}/interactions/dom`
} else if (shoutyHttpAdapters()) {
  interactionsDir = `${__dirname}/interactions/http`
} else {
  interactionsDir = `${__dirname}/interactions/direct`
}
const interaction = makeInteractionLoader(interactionsDir)
ActorWorld.defineActorParameterType()

type Stop = () => Promise<unknown>

export default class World extends ActorWorld {
  public readonly shouty = new Shouty()
  public readonly apiPort = 8080
  public readonly stops: Stop[] = []

  public readonly appElements = new AppElements()

  // Screenplay Interactions
  public moveTo: MoveTo
  public shout: Shout
  public messagesHeard: MessagesHeard
}

setWorldConstructor(World)

Before(async function (this: World) {
  this.moveTo = await interaction('moveTo')
  this.shout = await interaction('shout')
  this.messagesHeard = await interaction('messagesHeard')

  if (!process.env.KEEP_DOM) {
    this.stops.push(() => Promise.resolve(this.appElements.destroyAll()))
  }

  if (shoutyHttpAdapters()) {
    const app = makeApp()

    await new Promise<void>((resolve, reject) => {
      app.on('error', reject)

      const server = app.listen(this.apiPort, resolve)
      const stopServer: Stop = promisify(server.close.bind(server))
      this.stops.push(stopServer)
    })
  }
})

After(async function (this: World) {
  await Promise.all(this.stops.reverse().map((stop) => stop()))
})
