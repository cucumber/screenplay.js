import Inbox from './Inbox'

export type Coordinate = {
  readonly x: number
  readonly y: number
}

export type Message = string

export interface Session {
  readonly userId: string
  readonly inbox: Inbox
  send(message: Message): Promise<void>
  start(): Promise<void>
  stop(): Promise<void>
}

export type MessageListener = (message: Message) => void
