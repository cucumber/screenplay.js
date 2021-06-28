import { Coordinate, Message, Session } from './types'
import Shouty from './Shouty'
import Inbox from './Inbox'

export default class ShoutySession implements Session {
  public coordinate: Coordinate

  constructor(public readonly userId: string, public readonly inbox: Inbox, private readonly shouty: Shouty) {}

  async send(message: Message): Promise<void> {
    this.shouty.broadcast(this, message)
  }
}
