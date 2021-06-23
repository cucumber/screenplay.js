import useHttpAdapter from "../helpers/useHttpAdapter";

export default async function interaction<T>(name): Promise<T> {
  const dir = useHttpAdapter() ? 'http' : 'direct'
  const interaction = await import((`./${dir}/${name}`))
  return interaction[name] as T
}
