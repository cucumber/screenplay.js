import { MessageListener, Message } from './types'

export default class Inbox {
  private readonly listeners = new Set<MessageListener>()

  on(listener: MessageListener) {
    this.listeners.add(listener)
  }

  off(listener: MessageListener) {
    this.listeners.delete(listener)
  }

  deliver(message: Message) {
    if (this.listeners.size === 0) {
      throw new Error(`Dropping message "${message}" on the floor because there are no listeners`)
    }
    for (const listener of this.listeners) {
      listener(message)
    }
  }
}
