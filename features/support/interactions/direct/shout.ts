import { Actor } from '../../../../src'
import World from '../../World'
import {Shout} from "../types";

export const shout: Shout = (message: string) => {
  return async (actor: Actor<World>) => {
    actor.world.shouty.shout(actor.name, message)
  }
}
