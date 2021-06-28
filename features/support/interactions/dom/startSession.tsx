import { Actor } from '../../../../src'
import World from '../../World'
import { StartSession } from '../types'
import { Coordinate } from '../../../src/types'
import makeSession from '../../helpers/makeSession'
import ReactDOM from 'react-dom'
import App from '../../../src/components/App'
import React from 'react'

export const startSession: StartSession = (coordinate: Coordinate) => {
  return async (actor: Actor<World>) => {
    const session = makeSession(actor, coordinate)
    const appElement = actor.world.appElements.create(document, actor.name)
    ReactDOM.render(<App session={session} />, appElement)
    actor.remember('appElement', appElement)
  }
}
