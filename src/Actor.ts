export type Interaction<Answer = void, World = unknown> = (
  actor: Actor<World>
) => Promise<Answer>

export type DefaultFunction<T> = (actor) => T

/**
 * An Actor as defined by the ScreenPlay pattern
 */
export default class Actor<World = unknown> {
  private readonly memory = new Map<string, unknown>()

  constructor(public readonly world: World, public readonly name: string) {}

  remember<T>(key: string, value: T) {
    if (value === undefined || value === null)
      throw new Error(
        `Cannot remember an empty value (${JSON.stringify(value)})`
      )
    this.memory.set(key, value)
  }

  recall<T>(key: string, defaultFunction?: DefaultFunction<T>): T {
    if (!this.memory.has(key) && defaultFunction) {
      this.memory.set(key, defaultFunction(this))
    }
    return this.memory.get(key) as T
  }

  attemptsTo<Answer>(interaction: Interaction<Answer, World>): Promise<Answer> {
    return interaction(this)
  }

  // Just a synonym for attemptsTo
  ask<Answer>(question: Interaction<Answer, World>): Promise<Answer> {
    return this.attemptsTo(question)
  }
}
