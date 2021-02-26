import { Actor } from '@cucumber/screenplay'
import World from '../../World'

export default function inProcessMessagesHeard() {
  return (actor: Actor<World>) => {
    return actor.world.shouty.getMessages(actor.name)
  }
}