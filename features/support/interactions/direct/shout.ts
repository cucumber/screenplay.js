import { Actor } from '../../../../src'
import World from '../../World'
import {Shout} from "../types";

export default function shout(message: string): Shout {
  return async (actor: Actor<World>) => {
    actor.world.shouty.shout(actor.name, message)
  }
}
