import {Actor} from "../../../src";
import World from "../World";
import ReactDOM from "react-dom";
import React from "react";
import App from "../../src/components/App";

export default function getAppElement(actor: Actor<World>): HTMLElement {
  return actor.recall('appElement', ({name}) => {
    const appElement = actor.world.appElements.create(document, name)
    ReactDOM.render(<App name={actor.name} shoutyApi={actor.world.shouty}/>, appElement)
    return appElement as HTMLElement
  });
}
