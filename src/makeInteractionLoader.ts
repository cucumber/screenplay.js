/**
 * Returns a function that can be used to load interactions from a specific directory.
 * This is useful when you have multiple implementations of the same interactions.
 *
 * @param interactionsDir
 */
import { Interaction } from './Actor'

export default function (interactionsDir: string): InteractionLoader {
  return async function interaction<T>(name): Promise<T> {
    const path = `${interactionsDir}/${name}`
    try {
      const interaction = await import(path)
      return interaction[name] as T
    } catch (err) {
      // @ts-ignore
      return () => {
        throw new Error(`No interaction in: ${path}.{js,ts,jsx,tsx}`)
      }
    }
  }
}

export type InteractionLoader = (name: string) => Promise<MakeInteraction>
export type MakeInteraction = (...args: never[]) => Interaction<never>
