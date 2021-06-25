import React, { useState } from 'react'
import ShoutyApi from '../ShoutyApi'

type Props = {
  name: string
  shoutyApi: ShoutyApi
  messagesHeard: readonly string[]
}

const App: React.FunctionComponent<Props> = ({ name, shoutyApi, messagesHeard }) => {
  const [message, setMessage] = useState('')

  const onShout = (e) => {
    e.preventDefault()
    shoutyApi.shout(name, message)
  }

  return (
    <div>
      <h1>{name}</h1>

      <form onSubmit={onShout}>
        <label>
          Message
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
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
  )
}

export default App
