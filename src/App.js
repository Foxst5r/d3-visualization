import logo from "./logo.svg";
import "./App.css";
import { format, scaleBand, scaleLinear, max, axisBottom, extent } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
const width = 1000;
const height = 500;
const margin = { top: 20, right: 30, bottom: 60, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;
const siFormat = format(".2s");
const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");
function App() {
  const data = useData();

  if (!data) {
    return <pre>Loading... </pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.left;

  const xValue = (d) => d.petal_length;
  const xAxisLabel = "Petal Length";

  const yValue = (d) => d.sepal_width;
  const yAxisLabel = "Sepal Width";

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffSet={5}
        ></AxisBottom>
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          tickOffSet={5}
        ></AxisLeft>
        <text
          className="axis-label"
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + xAxisLabelOffset}
        >
          {xAxisLabel}
        </text>
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90) `}
        >
          {yAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          cirlceRadius={7}
        ></Marks>
      </g>
    </svg>
  );
}

export default App;
