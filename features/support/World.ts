import { setWorldConstructor, Before, After } from '@cucumber/cucumber'
import {ActorWorld, makeInteractionLoader} from '../../src/index'

import Shouty from '../src/shouty'
import { makeApp} from '../src/server'
import useHttpAdapter from './helpers/useHttpAdapter'
import { promisify } from 'util'
import {MessagesHeard, MoveTo, Shout} from "./interactions/types";

const interaction = makeInteractionLoader(`${__dirname}/interactions/${useHttpAdapter() ? 'http' : 'direct'}`)
ActorWorld.defineActorParameterType()

type Stop = () => Promise<unknown>

export default class World extends ActorWorld {
  public readonly shouty = new Shouty()
  public readonly apiPort = 8080
  public readonly stops: Stop[] = []

  // Interactions
  public moveTo: MoveTo
  public shout: Shout
  public messagesHeard: MessagesHeard
}

setWorldConstructor(World)

Before(async function (this: World) {
  this.moveTo = await interaction('moveTo')
  this.shout = await interaction('shout')
  this.messagesHeard = await interaction('messagesHeard')

  if (useHttpAdapter()) {
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
