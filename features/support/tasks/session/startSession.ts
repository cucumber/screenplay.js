import { Actor } from '../../../../src'
import World from '../../World'
import { StartSession } from '../types'
import getSession from '../../helpers/getSession'
import assert from 'assert'
import getInboxMessages from '../../helpers/getInboxMessages'

export const startSession: StartSession = () => {
  return async (actor: Actor<World>) => {
    const session = getSession(actor)
    assert.deepStrictEqual(getInboxMessages(actor), [])
    await session.start()
  }
}
