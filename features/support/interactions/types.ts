import { Interaction } from '../../../src'
import { Message, Coordinate } from '../../src/types'

export type StartSession = (coordinate: Coordinate) => Interaction<Promise<void>>
export type Shout = (message: Message) => Interaction
export type InboxMessages = () => Interaction<readonly Message[]>
