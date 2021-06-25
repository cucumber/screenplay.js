import express from 'express'
import Shouty from './Shouty'
import { Coordinate } from './types'

export function makeApp(shouty: Shouty) {
  const exp = express()

  exp.post('/location', async (req, res) => {
    const { username, x, y } = req.query

    const coordinate: Coordinate = { x: +x, y: +y }
    shouty.moveTo(username as string, coordinate)

    res.status(200).send({ username, x, y })
  })

  exp.post('/shout', async (req, res) => {
    const { username, message } = req.query

    shouty.shout(username as string, message as string)
    res.status(200).send({ username, message })
  })

  exp.get('/messages', async (req, res) => {
    const { username } = req.query
    const messages = shouty.getMessages(username as string)

    res.status(200).send({ username, messages })
  })

  return exp
}
