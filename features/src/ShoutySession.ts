import { Coordinate, Message, Session } from './types'
import Shouty from './Shouty'
import Inbox from './Inbox'

export default class ShoutySession implements Session {
  public coordinate: Coordinate = { x: 0, y: 0 }

  constructor(
    public readonly userId: string,
    public readonly inbox: Inbox,
    // Members not on the Session interface
    private readonly shouty: Shouty
  ) {}

  start(): Promise<void> {
    return Promise.resolve(undefined)
  }

  stop(): Promise<void> {
    return Promise.resolve(undefined)
  }

  async send(message: Message): Promise<void> {
    this.shouty.broadcast(this, message)
  }
}
