import { Actor, eventually } from '../../../../src'
import World from '../../World'
import { StartSession } from '../types'
import getDomUser from '../../helpers/getDomUser'
import assert from 'assert'

export const startSession: StartSession = () => {
  return async (actor: Actor<World>) => {
    const { element } = getDomUser(actor)
    await eventually(() => assert.strictEqual(element.querySelector('.status')?.innerHTML, 'connected'))
  }
}
