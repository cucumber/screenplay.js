import { Actor } from '@cucumber/screenplay'
import World from '../../World'
import { Location } from '../../../../src/shouty'

export default function inProcessMessagesHeard(distance: number) {
  return async (actor: Actor<World>) => {
    actor.world.shouty.moveTo(actor.name, new Location(distance, 0))
  }
}