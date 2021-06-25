export default interface ShoutyApi {
  shout(shouterName: string, message: string): void
  getMessages(name: string): readonly string[]
}
