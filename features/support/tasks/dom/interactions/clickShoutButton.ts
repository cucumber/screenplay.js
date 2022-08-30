import { Actor, eventually } from '../../../../../src'
import World from '../../../World'
import { getByText } from '@testing-library/dom'
import { ClickShoutButton } from './types'
import { DomUser } from '../../../helpers/getDomUser'
import assert from 'assert'

export const clickShoutButton: ClickShoutButton = () => {
  return async (actor: Actor<World>) => {
    const { element, user } = actor.recall<DomUser>('domUser')
    const submit = getByText(element, `Shout`)
    user.click(submit)
    // The field will be cleared when the POST is complete
    await eventually(() => assert.deepStrictEqual(element.querySelector('input')?.value, ''))
  }
}
