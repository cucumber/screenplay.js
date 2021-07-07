import fetch from 'node-fetch'
import { Message, Session } from './types'
import Inbox from './Inbox'

export default class HttpSession implements Session {
  public readonly inbox = new Inbox()
  private eventSource: EventSource

  constructor(
    public readonly userId: string,
    private readonly baseURL: URL,
    private readonly newEventSource: (url: string) => EventSource
  ) {}

  async start(): Promise<void> {
    const url = new URL('/messages', this.baseURL)
    url.searchParams.set('userId', this.userId)

    return new Promise((resolve, reject) => {
      const eventSource = this.newEventSource(url.toString())
      eventSource.onerror = (e) => reject(new Error(`Connection failed: ${JSON.stringify(e)}`))
      eventSource.onopen = () => resolve()

      eventSource.addEventListener('message', (event) => {
        this.inbox.deliver(event.data)
      })

      this.eventSource = eventSource
    })
  }

  async stop(): Promise<void> {
    this.eventSource.close()
  }

  async send(message: Message): Promise<void> {
    const url = new URL('/shout', this.baseURL)
    url.searchParams.set('userId', this.userId)
    url.searchParams.set('message', message)
    await fetch(url.toString(), { method: 'POST' })
  }
}
