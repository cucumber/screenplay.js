import { Action, PromiseAction } from '../../../../../src'
import { Message } from '../../../../src/types'

export type ClickShoutButton = () => PromiseAction
export type TypeMessage = (message: Message) => Action
