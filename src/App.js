import logo from "./logo.svg";
import "./App.css";

import { useWorldAtlas } from "./useWorldAtlas";
import { Marks } from "./Marks";
import { useCities } from "./useCities";
import { max, scaleSqrt } from "d3";
const width = 1000;
const height = 500;

function App() {
  const worldAtlas = useWorldAtlas();
  const cities = useCities();

  if (!worldAtlas || !cities) {
    return <pre>Loading... </pre>;
  }

  //r = sqrt(Area/pi)
  const sizeValue = (d) => d.population;
  const maxRadius = 15;

  const sizeScale = scaleSqrt()
    .domain([0, max(cities, sizeValue)])
    .range([0, maxRadius]);

  return (
    <svg width={width} height={height}>
      <Marks
        worldAtlas={worldAtlas}
        cities={cities}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      ></Marks>
    </svg>
  );
}

export default App;
