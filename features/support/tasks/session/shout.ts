import { Actor } from '../../../../src'
import World from '../../World'
import { Shout } from '../types'
import { Message } from '../../../src/types'
import getSession from '../../helpers/getSession'

export const shout: Shout = (message: Message) => {
  return async (actor: Actor<World>) => {
    const session = getSession(actor)
    await session.send(message)
  }
}
