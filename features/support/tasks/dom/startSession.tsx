import { Actor } from '../../../../src'
import World from '../../World'
import { StartSession } from '../types'
import getAppElement from '../../helpers/getAppElement'
import assert from 'assert'

export const startSession: StartSession = () => {
  return async (actor: Actor<World>) => {
    assert(getAppElement(actor))
  }
}
