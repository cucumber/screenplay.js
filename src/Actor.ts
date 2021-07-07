export type Interaction<Answer = void> = (actor: Actor) => Answer
export type PromiseInteraction<Answer = void> = (actor: Actor) => Promise<Answer>

export type DefaultFunction<T> = () => T

/**
 * An Actor represents a user interacting with the system.
 */
export default class Actor<World = unknown> {
  private readonly memory = new Map<string, unknown>()
  constructor(public readonly world: World, public readonly name: string) {}

  public remember<T>(key: string, value: T) {
    this.memory.set(key, value)
  }

  public recall<T>(key: string, defaultFunction?: DefaultFunction<T>): T {
    if (!this.memory.has(key) && defaultFunction) {
      this.memory.set(key, defaultFunction())
    }
    return this.memory.get(key) as T
  }

  public attemptsTo<Answer>(interaction: Interaction<Answer>): Answer {
    return interaction(this)
  }

  /**
   * Just a synonym for attemptsTo
   */
  public ask<Answer>(question: Interaction<Answer>): Answer {
    return question(this)
  }
}
