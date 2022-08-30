import { Actor } from '../../../../src'
import World from '../../World'
import { InboxMessages } from '../types'
import { microdata, toArray } from '@cucumber/microdata'
import { Conversation, Message, TextDigitalDocument } from 'schema-dts'
import { DomUser } from '../../helpers/getDomUser'
import assert from 'assert'

export const inboxMessages: InboxMessages = () => {
  return (actor: Actor<World>) => {
    const { element } = actor.recall<DomUser>('domUser')
    // https://schema.org/Conversation
    const conversation = microdata<Conversation>('https://schema.org/Conversation', element)
    assert(conversation)
    const messages = toArray<Message>(conversation.hasPart as Message | Message[])
    return messages.map((message) => (message.about as TextDigitalDocument).name as string)
  }
}
