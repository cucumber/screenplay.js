import { Actor } from '../../../../src'
import World from '../../World'

export default function inProcessShout(message: string) {
  return async (actor: Actor<World>) => {
    actor.world.shouty.shout(actor.name, message)
  }
}
