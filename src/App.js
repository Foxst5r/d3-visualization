import "./App.css";
import { DateHistorgram } from "./DateHistogram/index";
import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import { BubbleMap } from "./BubbleMap/index";
const width = 1000;
const height = 500;
const dateHistogramSize = 0.2;

function App() {
  const worldAtlas = useWorldAtlas();
  const data = useData();

  if (!worldAtlas || !data) {
    return <pre>Loading... </pre>;
  }

  //r = sqrt(Area/pi)

  return (
    <svg width={width} height={height}>
      <BubbleMap worldAtlas={worldAtlas} data={data} />
      <g transform={`translate(0,${height - dateHistogramSize * height})`}>
        <DateHistorgram
          data={data}
          height={dateHistogramSize * height}
          width={width}
        />
      </g>
    </svg>
  );
}

export default App;
