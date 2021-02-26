import express from 'express'
import Shouty, { Location } from './shouty'

export function makeApp() {
  const exp = express()
  const shouty = new Shouty()

  exp.post(
    '/location',
    async (req, res) => {
      const {username, locationX, locationY } = req.query

      shouty.moveTo(username as string, new Location(parseInt(locationX as string), parseInt(locationY as string)))
      res.status(200).send({username, locationX, locationY})
    }
  )

  exp.post(
    '/shout',
    async (req, res) => {
      const { username, message } = req.query

      shouty.shout(username as string, message as string)
      res.status(200).send({username, message})
    }
  )

  exp.get(
    '/messages',
    async (req, res) => {
      const { username } = req.query
      const messages = shouty.getMessages(username as string)

      res.status(200).send({username, messages})
    }
  )

  return exp
}
