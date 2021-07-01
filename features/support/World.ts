import { setWorldConstructor, Before, After, defineParameterType } from '@cucumber/cucumber'
import { AppElements } from '@cucumber/electron'
import { ActorWorld, makeInteractionLoader, ActorParameterType } from '../../src/index'

import Shouty from '../src/Shouty'
import { makeApp } from '../src/server'
import { promisify } from 'util'
import { InboxMessages, Shout, StartSession } from './interactions/types'

defineParameterType({ ...ActorParameterType })
defineParameterType({
  name: 'coordinate',
  regexp: /\(\s*(\d+),\s*(\d+)\s*\)/,
  transformer(x, y) {
    return { x: +x, y: +y }
  },
})

type Stop = () => Promise<void>

export default class World extends ActorWorld {
  public readonly stops: Stop[] = []
  public readonly shouty = new Shouty()
  public readonly apiPort = 8080

  public readonly appElements = new AppElements()

  // Screenplay Interactions
  public startSession: StartSession
  public shout: Shout
  public inboxMessages: InboxMessages
}

setWorldConstructor(World)

Before(async function (this: World) {
  const interactionsDir = `${__dirname}/interactions/${process.env.CUCUMBER_SCREENPLAY_INTERACTIONS || 'session'}`
  const interaction = makeInteractionLoader(interactionsDir)

  this.startSession = await interaction('startSession')
  this.shout = await interaction('shout')
  this.inboxMessages = await interaction('inboxMessages')
})

Before(async function (this: World) {
  if (!process.env.KEEP_DOM) {
    this.stops.push(async () => this.appElements.destroyAll())
  }

  if (process.env.CUCUMBER_SCREENPLAY_SESSIONS === 'http') {
    const app = makeApp(this.shouty)

    await new Promise<void>((resolve, reject) => {
      app.on('error', reject)

      const server = app.listen(this.apiPort, resolve)
      const stopServer = promisify(server.close.bind(server)) as Stop
      this.stops.push(stopServer)
    })
  }
})

After(async function (this: World) {
  await Promise.all(this.stops.reverse().map((stop) => stop()))
})
