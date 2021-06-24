import ShoutyApi from './ShoutyApi'
import { Coordinate } from './types'
import calculateDistance from './calculateDistance'

export default class Shouty implements ShoutyApi {
  private readonly coordinates = new Map<string, Coordinate>()
  private readonly messages = new Map<string, string[]>()

  public moveTo(name: string, coordinate: Coordinate) {
    this.coordinates.set(name, coordinate)
  }

  public shout(shouterName: string, message: string) {
    const shouterLocation = this.coordinates.get(shouterName) || { x: 0, y: 0 }

    for (const receiverName of this.coordinates.keys()) {
      const receiverLocation = this.coordinates.get(receiverName) || {
        x: 0,
        y: 0,
      }
      const distance = calculateDistance(shouterLocation, receiverLocation)

      if (distance <= 1000 && shouterName !== receiverName) {
        const receiverMessages = this.messages.get(receiverName) || []
        receiverMessages.push(message)
        this.messages.set(receiverName, receiverMessages)
      }
    }
  }

  public getMessages(name: string) {
    return this.messages.get(name) || []
  }
}
