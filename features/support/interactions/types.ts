import {Interaction} from "../../../src";

// These types are not strictly necessary, but having a type for each interaction
// can make the implementation of interactions more type-safe

export type Shout = Interaction
export type MoveTo = Interaction
export type MessagesHeard = Interaction<readonly string[]>
