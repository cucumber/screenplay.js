import { setWorldConstructor, Before, After, defineParameterType } from '@cucumber/cucumber'
import { ActorWorld, Interaction, defineActorParameterType } from '@cucumber/screenplay'

import Shouty from '../../src/shouty'
import { makeApp} from '../../src/server'

import inProcessMoveTo from './interactions/moveTo/inProcessMoveTo'
import httpMoveTo from './interactions/moveTo/httpMoveTo'

import inProcessShout from './interactions/shout/inProcessShout'
import httpShout from './interactions/shout/httpShout'

import inProcessMessagesHeard from './questions/messagesHeard/inProcessMessagesHeard'
import httpMessagesHeard from './questions/messagesHeard/httpMessagesHeard'

type Stop = () => Promise<void>

defineActorParameterType(defineParameterType)

export default class World extends ActorWorld {
  public readonly shouty = new Shouty()
  public readonly useHttpAdapter: boolean
  public readonly apiPort = 8080
  public readonly stops: Stop[] = []

  private readonly actorByName = new Map<string, Actor<World>>()

  constructor() {
    super()
    this.useHttpAdapter = !!process.env.SHOUTY_HTTP_ADAPTERS
  }

  moveTo(distance: number): Interaction {
    return this.useHttpAdapter ? httpMoveTo(distance) : inProcessMoveTo(distance)
  }

  shout(message: string): Interaction {
    return this.useHttpAdapter ? httpShout(message) : inProcessShout(message)
  }

  messagesHeard(): Interaction<string[]> {
    return this.useHttpAdapter ? httpMessagesHeard() : inProcessMessagesHeard()
  }
}

setWorldConstructor(World)

Before(async function (this: World) {
  if (this.useHttpAdapter) {
    const app = makeApp()

    await new Promise<void>((resolve, reject) => {
      app.on('error', reject)

      const server = app.listen(this.apiPort, resolve)
      const stopServer = () =>
        new Promise<void>((resolve, reject) =>
          server.close((err: Error | undefined) => (err ? reject(err) : resolve()))
        )
      this.stops.push(stopServer)
    })
  }
})

After(async function (this: World) {
  await Promise.all(this.stops.reverse().map((stop) => stop()))
})