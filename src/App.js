import logo from "./logo.svg";
import "./App.css";
import {
  timeFormat,
  scaleBand,
  scaleLinear,
  scaleTime,
  max,
  axisBottom,
  extent,
  bin,
  timeMonths,
  sum,
} from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
const width = 1000;
const height = 500;
const margin = { top: 20, right: 30, bottom: 60, left: 90 };
const xAxisLabelOffset = 80;
const yAxisLabelOffset = 40;

const xAxisTickFormat = timeFormat("%m/%d/%Y");
function App() {
  const data = useData();

  if (!data) {
    return <pre>Loading... </pre>;
  }

  const xValue = (d) => d["Reported Date"];
  const xAxisLabel = "Reported Date";

  const yValue = (d) => d["Total Dead and Missing"];
  const yAxisLabel = "Total Dead and Missing";

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.left;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => {
      return {
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1,
      };
    });

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d.y)])
    .range([innerHeight, 0])
    .nice();

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
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={(d) => d}
          innerHeight={innerHeight}
        ></Marks>
      </g>
    </svg>
  );
}

export default App;
