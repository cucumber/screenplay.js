import { Actor } from '../../../../src'
import World from '../../World'
import { InboxMessages } from '../types'
import getAppElement from '../../helpers/getAppElement'
import { microdata, toArray } from '@cucumber/microdata'
import { Conversation, Message, TextDigitalDocument } from 'schema-dts'

export const inboxMessages: InboxMessages = () => {
  return async (actor: Actor<World>) => {
    const $appElement = getAppElement(actor)
    // https://schema.org/Conversation
    const conversation = microdata('https://schema.org/Conversation', $appElement) as Conversation
    const messages = toArray<Message>(conversation.hasPart as Message | Message[])
    return messages.map((message) => (message.about as TextDigitalDocument).name as string)
  }
}
