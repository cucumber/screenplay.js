import { Interaction } from '../../../src'
import { Message } from '../../src/types'

export type StartSession = () => Interaction<Promise<void>>
export type Shout = (message: Message) => Interaction
export type InboxMessages = () => Interaction<readonly Message[]>
