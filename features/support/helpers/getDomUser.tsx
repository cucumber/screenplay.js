import { createRoot } from 'react-dom/client'
import App from '../../src/components/App'
import React from 'react'
import World from '../World'
import { Actor } from '../../../src'
import getSession from './getSession'
import userEvent from '@testing-library/user-event'
// import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup'

export type DomUser = {
  element: HTMLElement
  user: typeof userEvent
}

export default function getDomUser(actor: Actor<World>): DomUser {
  return actor.recall('domUser', () => {
    const session = getSession(actor)
    const element = actor.world.appElements.create(document, actor.name)
    const root = createRoot(element)
    // const user = userEvent.setup()
    root.render(<App session={session} />)
    return {
      user: userEvent,
      element,
    }
  })
}
