import { Actor } from '../../../../src'
import World from '../../World'
import fetch from 'node-fetch'
import { Shout } from '../types'

export const shout: Shout = (message: string) => {
  return async (actor: Actor<World>) => {
    await fetch(`http://localhost:${actor.world.apiPort}/shout?username=${actor.name}&message=${message}`, {
      method: 'POST',
    })
  }
}
