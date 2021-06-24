import React, {useState} from "react";
import ShoutyApi from "../ShoutyApi";
import {Location} from "../Shouty";

type Props = {
  name: string
  shoutyApi: ShoutyApi
}

const App: React.FunctionComponent<Props> = ({name, shoutyApi}) => {
  const [location, setLocation] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault()
    shoutyApi.moveTo(name, new Location(+location, 0))
  }
  return <div>
    <h1>{name}</h1>
    <form onSubmit={onSubmit}>
      <label>Location
        <input id="location" type="number" value={location} onChange={(e) => setLocation(+e.target.value)}/>
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>
}

export default App
