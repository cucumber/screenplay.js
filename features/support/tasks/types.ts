import { Action, PromiseAction } from '../../../src'
import { Message } from '../../src/types'

export type StartSession = () => PromiseAction
export type Shout = (message: Message) => Action
export type InboxMessages = () => Action<readonly Message[]>
