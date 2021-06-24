import {Interaction} from "../../../src";
import {Coordinate} from "../../src/types";

export type Shout = (message: string) => Interaction
export type MoveTo = (coordinate: Coordinate) => Interaction
export type MessagesHeard = () => Interaction<readonly string[]>
