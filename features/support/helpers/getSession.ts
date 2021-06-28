import { Actor } from '../../../src'
import World from '../World'
import { Session } from '../../src/types'
import HttpSession from '../../src/HttpSession'

export default function getSession(actor: Actor<World>): Session {
  return actor.recall('session', () => {
    const shoutySession = actor.world.shouty.getShoutySession(actor.name)
    if (process.env.CUCUMBER_SCREENPLAY_SESSIONS === 'http') {
      return new HttpSession(shoutySession.userId, new URL(`http://localhost:${actor.world.apiPort}`))
    } else {
      return shoutySession
    }
  })
}
