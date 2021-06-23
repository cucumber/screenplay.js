import useHttpAdapter from "../../helpers/useHttpAdapter";
import httpMoveTo from './httpMoveTo'
import inProcessMoveTo from './inProcessMoveTo'

export default function moveTo(distance: number) {
  return useHttpAdapter() ? httpMoveTo(distance) : inProcessMoveTo(distance)
}
