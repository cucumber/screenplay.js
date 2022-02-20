import express from 'express'
import Shouty from './Shouty'
import { Message } from './types'
import SseStream from 'ssestream'

export function makeApp(shouty: Shouty) {
  const exp = express()

  exp.post('/shout', (req, res) => {
    // TODO: Get userId from JWT
    const { userId, message } = req.query

    const session = shouty.getSession(userId as string)
    session
      .send(message as Message)
      .then(() => res.status(200).end())
      .catch((err) => res.status(500).end(err.message))
  })

  exp.get('/messages', (req, res) => {
    // TODO: Get userId from JWT
    const { userId } = req.query
    const session = shouty.getSession(userId as string)
    if (!session) {
      return res.status(500).end(`No session for userId=${userId}`)
    }
    const sse = new SseStream(req)

    session.inbox.on((message) =>
      sse.writeMessage({
        event: 'message',
        data: message,
      })
    )

    sse.pipe(res)

    req.on('close', () => {
      sse.unpipe(res)
      res.end()
    })

    return null
  })

  return exp
}
