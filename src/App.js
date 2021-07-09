import logo from "./logo.svg";
import "./App.css";
import {
  format,
  scaleBand,
  scaleLinear,
  max,
  axisBottom,
  extent,
  scaleOrdinal,
} from "d3";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { Dropdown } from "./Dropdown";
import { useState } from "react";
import { ColorLegend } from "./ColorLegend";

const width = 1000;
const menuHeight = 0;
const height = 500 - menuHeight;
const margin = { top: 20, right: 300, bottom: 60, left: 150 };
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

  const [hoveredValue, setHoveredValue] = useState(null);
  console.log(hoveredValue);

  const cirlceRadius = 7;

  const initialXAttribute = "petal_length";
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = findLabel(xAttribute);

  const initialYAttribute = "sepal_width";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = findLabel(yAttribute);

  const colorValue = (d) => d.species;

  const colorLegendLabel = "Species";

  const fadeOpacity = 0.2;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.left;

  if (!data) {
    return <pre>Loading... </pre>;
  }

  const filteredData = data.filter((d) => hoveredValue === colorValue(d));

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  // function findLabel(value) {
  //   const foundItems = attributes.filter((x) => x.value === value);
  //   if (foundItems && foundItems.length == 1) {
  //     return foundItems[0].label;
  //   }
  //    return "unknown";
  //  }

  return (
    <>
      <div className="menus-container">
        <span className="dropdown-label">X-axis:</span>
        <ReactDropdown
          options={attributes}
          value={xAttribute}
          onChange={({ value }) => setXAttribute(value)}
        />
        <span className="dropdown-label">Y-axis:</span>
        <ReactDropdown
          options={attributes}
          value={yAttribute}
          onChange={({ value }) => setYAttribute(value)}
        />
      </div>

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
          <g transform={`translate(${innerWidth + 60},60)`}>
            <text className="axis-label" textAnchor="middle" x={35} y={-30}>
              {colorLegendLabel}
            </text>
            <ColorLegend
              onHover={setHoveredValue}
              colorScale={colorScale}
              tickSize={cirlceRadius}
              fadeOpacity={fadeOpacity}
            ></ColorLegend>
          </g>
          <g opacity={hoveredValue ? fadeOpacity : 1}>
            <Marks
              data={data}
              xScale={xScale}
              yScale={yScale}
              colorScale={colorScale}
              xValue={xValue}
              yValue={yValue}
              colorValue={colorValue}
              tooltipFormat={xAxisTickFormat}
              cirlceRadius={cirlceRadius}
            ></Marks>
          </g>
          <Marks
            data={filteredData}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            xValue={xValue}
            yValue={yValue}
            colorValue={colorValue}
            tooltipFormat={xAxisTickFormat}
            cirlceRadius={cirlceRadius}
          ></Marks>
        </g>
      </svg>
    </>
  );
}

export default App;
