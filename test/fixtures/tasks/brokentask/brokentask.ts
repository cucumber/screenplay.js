// this import will fail
import { type Action } from './src'

export const badtask = (): Action => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return () => {}
}
