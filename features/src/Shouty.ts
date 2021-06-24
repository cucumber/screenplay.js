import ShoutyApi from "./ShoutyApi";

export class Location {
  constructor(
    public readonly x: number,
    public readonly y: number
  ){}

  distanceFrom(location: Location) {
    const xDiff = Math.abs(this.x - location.x)
    const yDiff = Math.abs(this.y - location.y)

    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
  }
}


export default class Shouty implements ShoutyApi {
  private readonly locations = new Map<string, Location>()
  private readonly messages = new Map<string, string[]>()

  public moveTo(name: string, location: Location) {
    this.locations.set(name, location)
  }

  public shout(shouterName: string, message: string) {
    const shouterLocation = this.locations.get(shouterName) || new Location(0, 0)

    for (const receiverName of this.locations.keys()) {
      const receiverLocation = this.locations.get(receiverName) || new Location(0, 0)
      const distance = shouterLocation.distanceFrom(receiverLocation)

      if (distance <= 1000  && shouterName !== receiverName) {
        const receiverMessages = this.messages.get(receiverName) || []
        receiverMessages.push(message)
        this.messages.set(receiverName, receiverMessages)
      }
    }
  }

  public getMessages(name: string) {
    return this.messages.get(name) || []
  }
}
