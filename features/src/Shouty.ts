import calculateDistance from './calculateDistance'
import { Message, Session } from './types'
import ShoutySession from './ShoutySession'
import Inbox from './Inbox'

export default class Shouty {
  private readonly sessionByUserId = new Map<string, ShoutySession>()

  makeShoutySession(userId: string): ShoutySession {
    if (!this.sessionByUserId.has(userId)) {
      // TODO: subscribe to Inbox so we can send EventSource message
      const inbox = new Inbox()
      const shoutySession = new ShoutySession(userId, inbox, this)
      this.sessionByUserId.set(userId, shoutySession)
    }
    return this.sessionByUserId.get(userId)
  }

  getSession(userId: string): Session {
    return this.sessionByUserId.get(userId)
  }

  broadcast(fromSession: ShoutySession, message: Message) {
    for (const recipient of this.sessionByUserId.values()) {
      const distance = calculateDistance(fromSession.coordinate, recipient.coordinate)
      if (distance <= 1000) {
        recipient.inbox.deliver(message)
      }
    }
  }
}
