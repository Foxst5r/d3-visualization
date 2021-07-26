import "./App.css";
import { DateHistorgram } from "./DateHistogram/index";
import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import { BubbleMap } from "./BubbleMap/index";
import { useState } from "react";
const width = 1000;
const height = 500;
const dateHistogramSize = 0.2;

const xValue = (d) => d["Reported Date"];

function App() {
  const worldAtlas = useWorldAtlas();
  const data = useData();
  const [brushExtent, setBrushExtent] = useState();

  if (!worldAtlas || !data) {
    return <pre>Loading... </pre>;
  }

  //r = sqrt(Area/pi)

  const filteredData = data.filter((d) => {
    const date = xValue(d);
    if (brushExtent) return date > brushExtent[0] && date < brushExtent[1];
    else return true;
  });

  return (
    <svg width={width} height={height}>
      <BubbleMap
        worldAtlas={worldAtlas}
        data={data}
        filteredData={filteredData}
      />
      <g transform={`translate(0,${height - dateHistogramSize * height})`}>
        <DateHistorgram
          data={data}
          height={dateHistogramSize * height}
          width={width}
          setBrushExtent={setBrushExtent}
          xValue={xValue}
        />
      </g>
    </svg>
  );
}

export default App;
