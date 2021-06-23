import useHttpAdapter from "../../helpers/useHttpAdapter";
import httpShout from "./httpShout";
import inProcessShout from "./inProcessShout";

export default function shout(message: string) {
  return useHttpAdapter() ? httpShout(message) : inProcessShout(message)
}
