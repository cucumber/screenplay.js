import { Actor } from '../../../../src'
import { InboxMessages } from '../types'
import World from '../../World'
import getInboxMessages from '../../helpers/getInboxMessages'

export const inboxMessages: InboxMessages = () => {
  return (actor: Actor<World>) => {
    return getInboxMessages(actor)
  }
}
