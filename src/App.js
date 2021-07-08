import logo from "./logo.svg";
import "./App.css";
import { format, scaleBand, scaleLinear, max, axisBottom, extent } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { Dropdown } from "./Dropdown";
import { useState } from "react";

const width = 1000;
const menuHeight = 0;
const height = 500 - menuHeight;
const margin = { top: 20, right: 30, bottom: 60, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;
const siFormat = format(".2s");
const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");
const attributes = [
  { value: "sepal_length", label: "Sepal length" },
  { value: "sepal_width", label: "Sepal width" },
  { value: "petal_length", label: "Petal length" },
  { value: "petal_width", label: "Petal Width" },
  { value: "species", label: "Species" },
];

const findLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    if (value === attributes[i].value) return attributes[i].label;
  }
  return "unknown";
};

function App() {
  const data = useData();

  const initialXAttribute = "petal_length";
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = findLabel(xAttribute);

  const initialYAttribute = "sepal_width";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = findLabel(yAttribute);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.left;

  if (!data) {
    return <pre>Loading... </pre>;
  }
  console.log(data.columns);

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  // function findLabel(value) {
  //   const foundItems = attributes.filter((x) => x.value === value);
  //   if (foundItems && foundItems.length == 1) {
  //     return foundItems[0].label;
  //   }
  //    return "unknown";
  //  }

  return (
    <>
      <label for="x-select">X-axis:</label>
      <Dropdown
        options={attributes}
        id="x-select"
        selectedValue={xAttribute}
        onSelectedValueChange={setXAttribute}
      />
      <label for="y-select">Y-axis:</label>
      <Dropdown
        options={attributes}
        id="y-select"
        selectedValue={yAttribute}
        onSelectedValueChange={setYAttribute}
      />
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
    </>
  );
}

export default App;
