import { Actor } from '@cucumber/screenplay'
import World from '../../World'

export default function inProcessShout(message: string) {
  return async (actor: Actor<World>) => {
    actor.world.shouty.shout(actor.name, message)
  }
}