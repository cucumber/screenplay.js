import express from 'express'
import Shouty from './Shouty'
import { Message } from './types'

export function makeApp(shouty: Shouty) {
  const exp = express()

  exp.post('/shout', (req, res) => {
    const { userId, message } = req.query
    // TODO: Get userId from JWT

    const shoutySession = shouty.getShoutySession(userId as string)
    shouty.broadcast(shoutySession, message as Message)
    res.status(200).end()
  })

  return exp
}
