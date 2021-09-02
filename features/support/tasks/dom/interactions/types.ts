import { Action } from '../../../../../src'
import { Message } from '../../../../src/types'

export type ClickShoutButton = () => Action
export type TypeMessage = (message: Message) => Action
