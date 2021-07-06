import makeInteractionLoader from './makeInteractionLoader'
import { readdirSync } from 'fs'
import path from 'path'

export default function assignInteractions<T>(thisObj: T, interactionsDir): void {
  const interaction = makeInteractionLoader(interactionsDir)
  const files = readdirSync(interactionsDir)
  for (const file of files) {
    const match = file.match(/(\.ts|\.js|\.tsx|\.jsx)$/)
    if (match) {
      const ext = match[1]
      const name = path.basename(file, ext)
      thisObj[name] = interaction(name)
    }
  }
}
