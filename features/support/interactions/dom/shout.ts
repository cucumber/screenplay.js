import { Actor } from '../../../../src'
import World from '../../World'
import {Shout} from "../types";
import getAppElement from "../../helpers/getAppElement";
import {getByLabelText, getByText} from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

export const shout: Shout = (message: string) => {
  return async (actor: Actor<World>) => {
    const $appElement = getAppElement('shout', actor)

    const $location = getByLabelText($appElement, `Message`)
    userEvent.type($location, '{selectall}' + message)

    const submit = getByText($appElement, `Shout`)
    userEvent.click(submit)
  }
}
