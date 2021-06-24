export default function (interactionsDir: string) {
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
