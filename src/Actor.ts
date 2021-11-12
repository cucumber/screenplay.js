export type Action<Answer = void, World = unknown> = (actor: Actor<World>) => Answer
export type PromiseAction<Answer = void, World = unknown> = (actor: Actor<World>) => Promise<Answer>

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

  public attemptsTo<Answer>(action: Action<Answer, World>): Answer {
    return action(this)
  }

  /**
   * Just a synonym for attemptsTo
   */
  public ask<Answer>(action: Action<Answer, World>): Answer {
    return action(this)
  }
}
