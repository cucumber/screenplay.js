type IParameterTypeDefinition<T> = {
  name: string
  regexp: RegExp
  transformer: (...match: string[]) => T
  useForSnippets?: boolean
  preferForRegexpMatch?: boolean
}

export default function defineActorParameterType<World>(defineParameterType: (t: IParameterTypeDefinition<any>) => void) {
  defineParameterType({
    name: 'actor',
    regexp: /[A-Z][a-z]+/,
    transformer(this: World, actorName: string) {
      // @ts-ignore
      return this.findOrCreateActor(actorName)
    },
  })
}
