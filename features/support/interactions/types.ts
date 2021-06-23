import {Interaction} from "../../../src";

export type Shout = (message: string) => Interaction
export type MoveTo = (distance: number) => Interaction
export type MessagesHeard = () => Interaction<readonly string[]>
