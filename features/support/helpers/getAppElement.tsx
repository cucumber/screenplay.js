import { Actor } from '../../../src'
import World from '../World'
import ReactDOM from 'react-dom'
import React from 'react'
import App from '../../src/components/App'

export default function getAppElement(key, actor: Actor<World>): HTMLElement {
  return actor.recall(key, ({ name }) => {
    const appElement = actor.world.appElements.create(
      document,
      `${name} (${key})`
    )
    ReactDOM.render(
      <App
        name={actor.name}
        shoutyApi={actor.world.shouty}
        messagesHeard={actor.world.shouty.getMessages(name)}
      />,
      appElement
    )
    return appElement as HTMLElement
  })
}
