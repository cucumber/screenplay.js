import { Actor } from '../../../../src'
import { MessagesHeard } from '../types'
import World from '../../World'

export const messagesHeard: MessagesHeard = () => {
  return async (actor: Actor<World>) => {
    return actor.world.shouty.getMessages(actor.name)
  }
}
