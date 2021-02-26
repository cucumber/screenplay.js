import { Actor } from '@cucumber/screenplay'
import World from '../../World'
import fetch from 'node-fetch'

export default function httpShout(message: string) {
  return async (actor: Actor<World>) => {
    await fetch(`http://localhost:${actor.world.apiPort}/shout?username=${actor.name}&message=${message}`, {
      method: 'POST'
    })
  }
}