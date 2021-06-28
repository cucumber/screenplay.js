import calculateDistance from './calculateDistance'
import { Message } from './types'
import ShoutySession from './ShoutySession'
import Inbox from './Inbox'

export default class Shouty {
  private readonly sessionByUserId = new Map<string, ShoutySession>()

  getShoutySession(userId: string): ShoutySession {
    if (!this.sessionByUserId.has(userId)) {
      // TODO: subscribe to Inbox so we can send EventSource message
      const inbox = new Inbox()
      const shoutySession = new ShoutySession(userId, inbox, this)
      this.sessionByUserId.set(userId, shoutySession)
    }
    return this.sessionByUserId.get(userId)
  }

  broadcast(shoutySession: ShoutySession, message: Message) {
    const fromCoordinate = shoutySession.coordinate
    for (const recipient of this.sessionByUserId.values()) {
      const distance = calculateDistance(fromCoordinate, recipient.coordinate)
      if (distance <= 1000) {
        recipient.inbox.deliver(message)
      }
    }
  }
}
