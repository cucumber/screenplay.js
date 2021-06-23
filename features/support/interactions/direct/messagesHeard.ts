import { Actor } from '../../../../src'
import World from '../../World'
import {MessagesHeard} from "../types";

export const messagesHeard: MessagesHeard = () => {
  return async (actor: Actor<World>) => {
    return actor.world.shouty.getMessages(actor.name)
  }
}
