import { Task, PromiseTask } from '../../../src'
import { Message } from '../../src/types'

export type StartSession = () => PromiseTask
export type Shout = (message: Message) => Task
export type InboxMessages = () => Task<readonly Message[]>
