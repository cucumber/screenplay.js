import { readdirSync } from 'fs'
import path from 'path'

export default function assignTasks<T>(thisObj: T, tasksDir: string): void {
  if (!tasksDir) throw new Error(`tasksDir was ${tasksDir}`)
  const files = readdirSync(tasksDir)
  for (const file of files) {
    const match = file.match(/(\.ts|\.js|\.tsx|\.jsx)$/)
    if (match) {
      const ext = match[1]
      const name = path.basename(file, ext)
      Object.defineProperty(thisObj, name, {
        value: loadTask(name),
      })
    }
  }

  function loadTask(name: string) {
    const path = `${tasksDir}/${name}`
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const task = require(path)
      return task[name]
    } catch (err) {
      return () => {
        throw new Error(`No task in: ${path}.{ts,js,tsx,jsx}`)
      }
    }
  }
}
