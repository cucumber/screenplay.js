import { Actor } from '../../../../src'
import World from '../../World'
import fetch from 'node-fetch'
import { Shout } from '../types'

export const shout: Shout = (message: string) => {
  return async (actor: Actor<World>) => {
    // TODO: Extract to HttpShouty
    const url = new URL(`http://localhost:${actor.world.apiPort}/shout`)
    url.searchParams.set('username', actor.name)
    url.searchParams.set('message', message)
    await fetch(url.toString(), { method: 'POST' })
  }
}
