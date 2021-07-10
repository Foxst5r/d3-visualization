import logo from "./logo.svg";
import "./App.css";

import { useWorldAtlas } from "./useWorldAtlas";
import { Marks } from "./Marks";
import { useCities } from "./useCities";
const width = 1000;
const height = 500;

function App() {
  const worldAtlas = useWorldAtlas();
  const cities = useCities();

  if (!worldAtlas || !cities) {
    return <pre>Loading... </pre>;
  }

  return (
    <svg width={width} height={height}>
      <Marks worldAtlas={worldAtlas} cities={cities}></Marks>
    </svg>
  );
}

export default App;
