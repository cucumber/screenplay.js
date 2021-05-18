import useHttpAdapter from "../../helpers/useHttpAdapter";
import httpMessagesHeard from "./httpMessagesHeard";
import inProcessMessagesHeard from "./inProcessMessagesHeard";

export default function messagesHeard() {
  return useHttpAdapter() ? httpMessagesHeard : inProcessMessagesHeard
}