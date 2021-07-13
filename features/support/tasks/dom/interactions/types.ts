import { Task } from '../../../../../src'
import { Message } from '../../../../src/types'

export type ClickShoutButton = () => Task
export type TypeMessage = (message: Message) => Task
