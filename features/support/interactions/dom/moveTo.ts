import World from '../../World'
import {Actor} from "../../../../src";
import {MoveTo} from "../types";
import getAppElement from "../../helpers/getAppElement";
import {getByLabelText, getByText} from '@testing-library/dom'
import userEvent from "@testing-library/user-event";

export const moveTo: MoveTo = (coordinate) => {
  return async (actor: Actor<World>) => {
    const $appElement = getAppElement('moveTo', actor)

    const $x = getByLabelText($appElement, `X`)
    userEvent.type($x, '{selectall}' + coordinate.x)

    const $y = getByLabelText($appElement, `Y`)
    userEvent.type($y, '{selectall}' + coordinate.y)

    const submit = getByText($appElement, `Move`)
    userEvent.click(submit)
  }
}
