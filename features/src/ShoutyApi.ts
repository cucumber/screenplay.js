import {Location} from "./Shouty";

export default interface ShoutyApi {
  moveTo(name: string, location: Location): void
  shout(shouterName: string, message: string): void
  getMessages(name: string): readonly string[]
}
