import { readdirSync } from 'fs'
import path from 'path'

export default async function asyncAssignTasks<T>(thisObj: T, tasksDir: string): Promise<void> {
  if (!tasksDir) throw new Error(`tasksDir was ${tasksDir}`)
  const files = readdirSync(tasksDir)
  for (const file of files) {
    const match = file.match(/(\.ts|\.js|\.tsx|\.jsx)$/)
    if (match) {
      const ext = match[1]
      const name = path.basename(file, ext)
      Object.defineProperty(thisObj, name, {
        value: await loadTask(name),
      })
    }
  }

  async function loadTask(name: string) {
    const path = `${tasksDir}/${name}`
    try {
      // Typescript has issues with dynamic imports, even though node supports them
      // for both commonjs and esmodules. see: https://github.com/microsoft/TypeScript/issues/43329
      const task = await Function(`return import("${path}")`)()
      return task[name]
    } catch (err) {
      return () => {
        throw new Error(`No task in: ${path}.{ts,js,tsx,jsx}`)
      }
    }
  }
}
