import { Actor } from '../../../../src'
import World from '../../World'
import fetch from 'node-fetch'
import { MessagesHeard } from '../types'

export const messagesHeard: MessagesHeard = () => {
  return async (actor: Actor<World>) => {
    const res = await fetch(`http://localhost:${actor.world.apiPort}/messages?username=${actor.name}`)
    const body = await res.json()
    return body.messages as readonly string[]
  }
}
