import logo from "./logo.svg";
import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import {
  csv,
  csvParse,
  csvFormat,
  arc,
  pie,
  scaleBand,
  scaleLinear,
  randomWeibull,
  max,
} from "d3";
import { message } from "./message";
const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/UN_Population_2019.csv";

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const centerX = width / 2;
const centerY = height / 2;

const pieArc = arc().innerRadius(0).outerRadius(width);

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = parseFloat(d["2020"]);
      return d;
    };
    csv(csvUrl, row).then((data) => {
      console.log(data[0]);
      setData(data.slice(0, 10));
    });
  }, []);

  if (!data) {
    return <pre>Loading... </pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = height - margin.left - margin.left;

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight]);
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, innerWidth]);
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {xScale.ticks().map((tickValue) => (
          <line
            x1={xScale(tickValue)}
            y1={0}
            x2={xScale(tickValue)}
            y2={innerHeight}
            stroke="black"
          />
        ))}
        {data.map((d) => (
          <rect
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
          />
        ))}
      </g>
    </svg>
  );
}

export default App;
