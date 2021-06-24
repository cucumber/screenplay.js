import World from '../../World'
import {Actor} from "../../../../src";
import {MoveTo} from "../types";
import getAppElement from "../../helpers/getAppElement";
import {getByLabelText, getByText} from '@testing-library/dom'
import userEvent from "@testing-library/user-event";

export const moveTo: MoveTo = (distance) => {
  return async (actor: Actor<World>) => {
    const $appElement = getAppElement(actor)

    const $location = getByLabelText($appElement, `Location`)
    userEvent.type($location, '{selectall}' + distance)

    const submit = getByText($appElement, `Submit`)
    userEvent.click(submit)
  }
}
