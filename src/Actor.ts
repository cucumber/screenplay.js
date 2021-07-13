export type Task<Answer = void> = (actor: Actor) => Answer
export type PromiseTask<Answer = void> = (actor: Actor) => Promise<Answer>

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

  public attemptsTo<Answer>(task: Task<Answer>): Answer {
    return task(this)
  }

  /**
   * Just a synonym for attemptsTo
   */
  public ask<Answer>(question: Task<Answer>): Answer {
    return question(this)
  }
}
