import logo from "./logo.svg";
import "./App.css";
import { scaleBand, scaleLinear, max, axisBottom } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
const width = 1000;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };

function App() {
  const data = useData();

  if (!data) {
    return <pre>Loading... </pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.left;
  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;
  const yScale = scaleBand().domain(data.map(yValue)).range([0, innerHeight]);
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight}></AxisBottom>
        <AxisLeft yScale={yScale}></AxisLeft>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        ></Marks>
      </g>
    </svg>
  );
}

export default App;
