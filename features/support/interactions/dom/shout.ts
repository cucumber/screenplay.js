import { Actor } from '../../../../src'
import World from '../../World'
import { Shout } from '../types'
import getAppElement from '../../helpers/getAppElement'
import { getByLabelText, getByText } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { Message } from '../../../src/types'

export const shout: Shout = (message: Message) => {
  return async (actor: Actor<World>) => {
    const $appElement = getAppElement(actor)

    const $location = getByLabelText($appElement, `Message`)
    userEvent.type($location, '{selectall}' + message)

    const submit = getByText($appElement, `Shout`)
    userEvent.click(submit)
  }
}
