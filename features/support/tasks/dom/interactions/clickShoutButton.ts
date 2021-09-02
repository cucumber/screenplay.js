import { Actor } from '../../../../../src'
import World from '../../../World'
import { getByText } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { ClickShoutButton } from './types'

export const clickShoutButton: ClickShoutButton = () => {
  return async (actor: Actor<World>) => {
    const $appElement = actor.recall('appElement') as HTMLElement
    const submit = getByText($appElement, `Shout`)
    userEvent.click(submit)
  }
}
