import { Actor } from '../../../../../src'
import World from '../../../World'
import { getByLabelText } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { TypeMessage } from './types'

export const typeMessage: TypeMessage = (message) => {
  return async (actor: Actor<World>) => {
    const $appElement = actor.recall('appElement') as HTMLElement
    const $location = getByLabelText($appElement, `Message`)
    userEvent.type($location, '{selectall}' + message)
  }
}
