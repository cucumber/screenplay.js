import fetch from 'node-fetch'
import { Actor } from '../../../../src'
import World from '../../World'
import { MoveTo } from '../types'

export const moveTo: MoveTo = (coordinate) => {
  return async (actor: Actor<World>) => {
    // TODO: Extract to HttpShouty
    const url = new URL(`http://localhost:${actor.world.apiPort}/location`)
    url.searchParams.set('username', actor.name)
    url.searchParams.set('x', '' + coordinate.x)
    url.searchParams.set('y', '' + coordinate.y)
    await fetch(url.toString(), { method: 'POST' })
  }
}
