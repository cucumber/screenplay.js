/**
 * Returns a function that can be used to load interactions from a specific directory.
 * This is useful when you have multiple implementations of the same interactions.
 *
 * @param interactionsDir
 */
import { Interaction } from './Actor'

export default function (interactionsDir: string): InteractionLoader {
  return function interaction<T>(name: string): T {
    const path = `${interactionsDir}/${name}`
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const interaction = require(path)
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
