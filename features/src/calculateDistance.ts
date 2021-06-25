import { Coordinate } from './types'

export default function calculateDistance(a: Coordinate, b: Coordinate): number {
  const xDiff = Math.abs(a.x - b.x)
  const yDiff = Math.abs(b.y - b.y)
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
}
