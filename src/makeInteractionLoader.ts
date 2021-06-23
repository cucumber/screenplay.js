export default function(dir: string) {
  return async function interaction<T>(name): Promise<T> {
    const interaction = await import((`${dir}/${name}`))
    return interaction[name] as T
  }
}
