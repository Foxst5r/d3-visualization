import "./App.css";
import { Mouth } from "./Mouth";
import { Eyes } from "./Eyes";
import { BackgroundCircle } from "./BackgroundCircle";
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
          <BackgroundCircle
            radius={centerY - strokeWidth / 2}
            strokeWidth={strokeWidth}
          />
          <Eyes
            eyeOffsetX={eyeOffsetX}
            eyeOffsetY={eyeOffsetY}
            eyeRadius={eyeRadius}
          />
          <Mouth mouthRadius={mouthRadius} mouthWidth={mouthWidth} />
        </g>
      </svg>
    </div>
  );
};

export default App;
