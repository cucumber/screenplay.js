import fetch from 'node-fetch'
import {Actor} from "../../../../src";
import World from "../../World";
import {MoveTo} from "../types";

export const moveTo: MoveTo = (distance) => {
  return async (actor: Actor<World>) => {
    // TODO: Extract to HttpShouty
    await fetch(`http://localhost:${actor.world.apiPort}/location?username=${actor.name}&locationX=${distance}&locationY=0`, {
      method: 'POST'
    })
  }
}
