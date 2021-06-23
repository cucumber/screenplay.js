import World from '../../World'
import { Location } from '../../../src/shouty'
import {Actor} from "../../../../src";

export default function inProcessMoveTo(distance: number) {
  return async (actor: Actor<World>) => {
    actor.world.shouty.moveTo(actor.name, new Location(distance, 0))
  }
}
