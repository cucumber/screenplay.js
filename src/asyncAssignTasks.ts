import { readdirSync } from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

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
    // this is needed for Windows, or you get ERR_UNSUPPORTED_ESM_URL_SCHEME
    const path = pathToFileURL(`${tasksDir}/${name}`).href

    // Typescript has issues with dynamic imports, even though node supports them
    // for both commonjs and esmodules. see: https://github.com/microsoft/TypeScript/issues/43329
    const task = await Function(`return import("${path}")`)()

    // if typescript is using commonjs modules
    if (task.default) {
      return task.default[name]
    }

    // if typescript is using es modules
    return task[name]
  }
}
