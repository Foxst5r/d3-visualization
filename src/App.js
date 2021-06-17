import logo from "./logo.svg";
import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import { csv, csvParse, csvFormat, arc, pie } from "d3";
import { message } from "./message";
const csvUrl =
  "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = arc().innerRadius(0).outerRadius(width);

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then((data) => {
      setData(data);
    });
  }, []);

  if (!data) {
    return <pre>Loading... </pre>;
  }
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX},${centerY})`}>
        {
          pie()
            .value(1)(data)
            .map((d) => (
              <path fill={d.data["RGB hex value"]} d={pieArc(d)} />
            ))

          // data.map((d, i) => (
          //   <path
          //     fill={d["RGB hex value"]}
          //     d={pieArc({
          //       startAngle: (i / data.length) * 2 * Math.PI,
          //       endAngle: ((i + 1) / data.length) * 2 * Math.PI,
          //     })}
          //   />
          // ))
        }
      </g>
    </svg>
  );
}

export default App;
