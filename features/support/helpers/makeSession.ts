import { Actor } from '../../../src'
import World from '../World'
import { Coordinate, Session } from '../../src/types'
import HttpSession from '../../src/HttpSession'

export default function makeSession(actor: Actor<World>, coordinate: Coordinate): Session {
  const shoutySession = actor.world.shouty.makeShoutySession(actor.name)
  shoutySession.coordinate = coordinate

  // Make sure we stop the session at the end of each scenario
  actor.world.stops.push(() => shoutySession.stop())

  if (process.env.CUCUMBER_SCREENPLAY_SESSIONS === 'http') {
    const httpSession = new HttpSession(shoutySession.userId, new URL(`http://localhost:${actor.world.apiPort}`))
    // Make sure we stop the session at the end of each scenario
    actor.world.stops.push(() => httpSession.stop())
    return httpSession
  } else {
    return shoutySession
  }
}
