import ActorWorld from './ActorWorld'

export default {
  name: 'actor',
  regexp: /[A-Z][a-z]+/,
  transformer(this: ActorWorld, actorName: string) {
    return this.findOrCreateActor(actorName)
  },
}
