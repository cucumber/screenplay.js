import { Actor } from '../../../src'
import World from '../World'
import { Session } from '../../src/types'

export default function getSession(actor: Actor<World>): Session {
  return actor.recall('session')
}
