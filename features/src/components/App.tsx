import React, { useEffect, useState } from 'react'
import { Message, Session } from '../types'

type Props = {
  session: Session
}

const App: React.FunctionComponent<Props> = ({ session }) => {
  const [message, setMessage] = useState('')
  const [error, setError] = useState<Error>()
  const [messages, setMessages] = useState<readonly Message[]>([])

  const { inbox } = session

  useEffect(() => {
    const listener = (message) => setMessages(messages.concat([message]))
    inbox.on(listener)
    return () => inbox.off(listener)
  }, [inbox, messages])

  const onShout = (e) => {
    e.preventDefault()
    session.send(message).catch((error) => setError(error))
  }

  return (
    <div>
      {error && <pre>{error.stack}</pre>}
      <form onSubmit={onShout}>
        <label>
          Message
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <button type="submit">Shout</button>
      </form>

      <ul itemScope itemType="https://schema.org/Conversation">
        {messages.map((message, i) => (
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
