import { readdirSync } from 'fs'
import path from 'path'

export default function assignInteractions<T>(thisObj: T, interactionsDir: string): void {
  const files = readdirSync(interactionsDir)
  for (const file of files) {
    const match = file.match(/(\.ts|\.js|\.tsx|\.jsx)$/)
    if (match) {
      const ext = match[1]
      const name = path.basename(file, ext)
      Object.defineProperty(thisObj, name, {
        value: loadInteraction(name),
      })
    }
  }

  function loadInteraction(name: string) {
    const path = `${interactionsDir}/${name}`
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const interaction = require(path)
      return interaction[name]
    } catch (err) {
      return () => {
        throw new Error(`No interaction in: ${path}.{ts,js,tsx,jsx}`)
      }
    }
  }
}
