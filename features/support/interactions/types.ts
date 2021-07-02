import { Interaction } from '../../../src'
import { Message } from '../../src/types'
import { PromiseInteraction } from '../../../src/Actor'

export type StartSession = () => PromiseInteraction
export type Shout = (message: Message) => Interaction
export type InboxMessages = () => Interaction<readonly Message[]>
