import { setWorldConstructor, Before, After, defineParameterType } from '@cucumber/cucumber'
import { ActorWorld, defineActorParameterType } from '@cucumber/screenplay'

import Shouty from '../../src/shouty'
import { makeApp} from '../../src/server'
import useHttpAdapter from './helpers/useHttpAdapter'


type Stop = () => Promise<void>

defineActorParameterType(defineParameterType)

export default class World extends ActorWorld {
  public readonly shouty = new Shouty()
  public readonly apiPort = 8080
  public readonly stops: Stop[] = []
}

setWorldConstructor(World)

Before(async function (this: World) {
  if (useHttpAdapter()) {
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