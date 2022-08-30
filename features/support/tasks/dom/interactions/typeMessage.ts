import { Actor } from '../../../../../src'
import World from '../../../World'
import { getByLabelText } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { TypeMessage } from './types'
import { DomUser } from '../../../helpers/getDomUser'

export const typeMessage: TypeMessage = (message) => {
  return async (actor: Actor<World>) => {
    const { element } = actor.recall<DomUser>('domUser')
    const $location = getByLabelText(element, `Message`)
    userEvent.type($location, '{selectall}' + message)
  }
}
