import { Actor } from '@cucumber/screenplay'
import World from '../../World'
import fetch from 'node-fetch'

export default function inProcessMoveTo(distance: number) {
  return async (actor: Actor<World>) => {
    await fetch(`http://localhost:${actor.world.apiPort}/location?username=${actor.name}&locationX=${distance}&locationY=0`, {
      method: 'POST'
    })

  }
}