import { Actor } from '../../../../src'
import World from '../../World'
import { StartSession } from '../types'
import { Coordinate, Message } from '../../../src/types'
import makeSession from '../../helpers/makeSession'

export const startSession: StartSession = (coordinate: Coordinate) => {
  return async (actor: Actor<World>) => {
    const session = makeSession(actor, coordinate)
    actor.remember('session', session)
    const messages: Message[] = []
    actor.remember('messages', messages)
    session.inbox.on((message) => messages.push(message))
    await session.start()
  }
}
