import {Coordinate} from "./types";

export default interface ShoutyApi {
  moveTo(name: string, location: Coordinate): void
  shout(shouterName: string, message: string): void
  getMessages(name: string): readonly string[]
}
