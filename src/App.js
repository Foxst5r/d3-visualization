import "./App.css";
import { arc } from "d3";

const width = 960;
const height = 500;
const centerY = height / 2;
const centerX = width / 2;
const strokeWidth = 20;
const eyeOffsetX = 90;
const eyeOffsetY = 100;
const eyeRadius = 40;
const mouthWidth = 20;
const mouthRadius = 130;

const mouthArc = arc()
  .innerRadius(mouthRadius)
  .outerRadius(mouthRadius + mouthWidth)
  .startAngle(Math.PI / 2)
  .endAngle((Math.PI * 3) / 2);

const App = () => {
  return (
    <div
      style={{
        margin: 0,
        overflow: "hidden",
      }}
    >
      <svg width={width} height={height}>
        <g transform={`translate(${centerX},${centerY})`}>
          <circle
            fill="yellow"
            stroke="black"
            r={centerY - strokeWidth / 2}
            stroke-width={strokeWidth}
          ></circle>
          <circle cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius}></circle>
          <circle cx={+eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius}></circle>
          <path d={mouthArc()} />
        </g>
      </svg>
    </div>
  );
};

export default App;
