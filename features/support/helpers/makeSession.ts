import { Actor } from '../../../src'
import World from '../World'
import { Coordinate, Session } from '../../src/types'
import HttpSession from '../../src/HttpSession'

export default function makeSession(actor: Actor<World>, coordinate: Coordinate): Session {
  const shoutySession = actor.world.shouty.makeShoutySession(actor.name)
  shoutySession.coordinate = coordinate
  if (process.env.CUCUMBER_SCREENPLAY_SESSIONS === 'http') {
    return new HttpSession(shoutySession.userId, new URL(`http://localhost:${actor.world.apiPort}`))
  } else {
    return shoutySession
  }
}
