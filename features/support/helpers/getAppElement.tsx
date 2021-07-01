import ReactDOM from 'react-dom'
import App from '../../src/components/App'
import React from 'react'
import World from '../World'
import { Actor } from '../../../src'
import getSession from './getSession'

export default function getAppElement(actor: Actor<World>) {
  return actor.recall('appElement', () => {
    const session = getSession(actor)
    const appElement = actor.world.appElements.create(document, actor.name)
    ReactDOM.render(<App session={session} />, appElement)
    return appElement
  })
}
