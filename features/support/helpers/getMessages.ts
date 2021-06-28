import { Actor } from '../../../src'
import World from '../World'
import { Message } from '../../src/types'

export default function getMessages(actor: Actor<World>): Message[] {
  return actor.recall('messages', () => [])
}
