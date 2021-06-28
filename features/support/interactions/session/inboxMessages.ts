import { Actor } from '../../../../src'
import { InboxMessages } from '../types'
import World from '../../World'
import getMessages from '../../helpers/getMessages'

export const inboxMessages: InboxMessages = () => {
  return async (actor: Actor<World>) => {
    return getMessages(actor)
  }
}
