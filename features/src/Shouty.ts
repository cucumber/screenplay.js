import calculateDistance from './calculateDistance'
import { Message, Session } from './types'
import ShoutySession from './ShoutySession'
import Inbox from './Inbox'

export default class Shouty {
  private readonly sessionByUserId = new Map<string, ShoutySession>()

  makeSession(userId: string): Session {
    let session = this.sessionByUserId.get(userId)
    if (!session) {
      const inbox = new Inbox()
      session = new ShoutySession(userId, inbox, this)
      this.sessionByUserId.set(userId, session)
    }
    return session
  }

  getSession(userId: string): ShoutySession {
    const session = this.sessionByUserId.get(userId)
    if (!session) {
      throw new Error(`No session for userId=${userId}`)
    }
    return session
  }

  broadcast(fromSession: ShoutySession, message: Message) {
    for (const session of this.sessionByUserId.values()) {
      const distance = calculateDistance(fromSession.coordinate, session.coordinate)
      if (distance <= 1000) {
        session.inbox.deliver(message)
      }
    }
  }
}
