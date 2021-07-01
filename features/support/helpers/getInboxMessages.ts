import { Actor } from '../../../src'
import World from '../World'
import { Message } from '../../src/types'
import getSession from './getSession'

export default function getInboxMessages(actor: Actor<World>): readonly Message[] {
  return actor.recall('inboxMessages', () => {
    const session = getSession(actor)
    const messages: Message[] = []
    session.inbox.on((message) => messages.push(message))
    return messages
  })
}
