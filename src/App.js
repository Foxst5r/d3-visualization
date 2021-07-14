import logo from "./logo.svg";
import "./App.css";

import { useWorldAtlas } from "./useWorldAtlas";
import { Marks } from "./Marks";
import { useData } from "./useData";
import { max, scaleSqrt } from "d3";
const width = 1000;
const height = 500;

function App() {
  const worldAtlas = useWorldAtlas();
  const data = useData();

  if (!worldAtlas || !data) {
    return <pre>Loading... </pre>;
  }

  //r = sqrt(Area/pi)
  const sizeValue = (d) => d["Total Dead and Missing"];
  const maxRadius = 15;

  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius]);

  return (
    <svg width={width} height={height}>
      <Marks
        worldAtlas={worldAtlas}
        data={data}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      ></Marks>
    </svg>
  );
}

export default App;
