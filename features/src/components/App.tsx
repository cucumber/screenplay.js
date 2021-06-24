import React, {useState} from "react";
import ShoutyApi from "../ShoutyApi";

type Props = {
  name: string
  shoutyApi: ShoutyApi,
  messagesHeard: readonly string[]
}

const App: React.FunctionComponent<Props> = ({name, shoutyApi, messagesHeard}) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [message, setMessage] = useState('');

  const onMoveTo = (e) => {
    e.preventDefault()
    shoutyApi.moveTo(name, {x, y})
  }

  const onShout = (e) => {
    e.preventDefault()
    shoutyApi.shout(name, message)
  }

  return <div>
    <h1>{name}</h1>
    <form onSubmit={onMoveTo}>
      <label>X
        <input type="number" value={x} onChange={(e) => setX(+e.target.value)}/>
      </label>
      <label>Y
        <input type="number" value={y} onChange={(e) => setY(+e.target.value)}/>
      </label>
      <button type="submit">Move</button>
    </form>

    <form onSubmit={onShout}>
      <label>Message
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
      </label>
      <button type="submit">Shout</button>
    </form>

    <ul itemScope itemType="https://schema.org/Conversation">
      {messagesHeard.map((message, i) => (
        <li key={i} itemScope itemProp="hasPart" itemType="https://schema.org/Message">
          <div itemScope itemProp="about" itemType="https://schema.org/Thing">
            <div itemProp="name">{message}</div>
          </div>
        </li>
      ))}
    </ul>
  </div>
}

export default App
