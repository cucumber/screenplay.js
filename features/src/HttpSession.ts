import fetch from 'node-fetch'
import { Message, Session } from './types'
import Inbox from './Inbox'

export default class HttpSession implements Session {
  public readonly inbox = new Inbox()

  constructor(public readonly userId: string, private readonly baseURL: URL) {}

  async send(message: Message): Promise<void> {
    const url = new URL('/shout', this.baseURL)
    url.searchParams.set('userId', this.userId)
    url.searchParams.set('message', message)
    await fetch(url.toString(), { method: 'POST' })
  }
}
