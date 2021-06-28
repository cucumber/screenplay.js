import { Actor } from '../../../../src'
import { InboxMessages } from '../types'
import World from '../../World'

export const inboxMessages: InboxMessages = () => {
  return (actor: Actor<World>) => {
    return actor.recall('messages')
  }
}
