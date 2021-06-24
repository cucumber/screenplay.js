import World from '../../World'
import { Actor } from '../../../../src'
import { MoveTo } from '../types'

export const moveTo: MoveTo = (coordinate) => {
  return async (actor: Actor<World>) => {
    actor.world.shouty.moveTo(actor.name, coordinate)
  }
}
