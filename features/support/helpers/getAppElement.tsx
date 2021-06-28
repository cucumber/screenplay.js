import { Actor } from '../../../src'
import ReactDOM from 'react-dom'
import React from 'react'
import App from '../../src/components/App'
import World from '../World'
import getSession from './getSession'

export default function getAppElement(actor: Actor<World>): HTMLElement {
  return actor.recall('appElement', () => {
    const session = getSession(actor)
    const appElement = actor.world.appElements.create(document, actor.name)
    ReactDOM.render(<App session={session} />, appElement)
    return appElement as HTMLElement
  })
}
