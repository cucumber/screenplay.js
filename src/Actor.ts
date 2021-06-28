export type Interaction<Answer = void> = (actor: Actor) => Promise<Answer>

export type DefaultFunction<T> = () => T

/**
 * An Actor as defined by the ScreenPlay pattern
 */
export default class Actor<World = unknown> {
  private readonly memory = new Map<string, unknown>()

  constructor(public readonly world: World, public readonly name: string) {}

  remember<T>(key: string, value: T) {
    this.memory.set(key, value)
  }

  recall<T>(key: string, defaultFunction?: DefaultFunction<T>): T {
    if (!this.memory.has(key) && defaultFunction) {
      this.memory.set(key, defaultFunction())
    }
    return this.memory.get(key) as T
  }

  attemptsTo<Answer>(interaction: Interaction<Answer>): Promise<Answer> {
    return interaction(this)
  }

  /**
   * Just a synonym for attemptsTo
   * @deprecated use expect instead
   */
  ask<Answer>(question: Interaction<Answer>): Promise<Answer> {
    return question(this)
  }
}
