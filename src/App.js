import "./App.css";
import { range } from "d3";
import { Face } from "./Face";
const width = 160;
const height = 160;

const array = range(5 * 3);

const App = () =>
  array.map(() => {
    return (
      <Face
        width={width}
        height={height}
        centerY={height / 2}
        centerX={width / 2}
        strokeWidth={10 + Math.random() * 7}
        eyeOffsetX={30 + Math.random() * 5}
        eyeOffsetY={30 + Math.random() * 7}
        eyeRadius={10 + Math.random() * 5}
        mouthWidth={1 + Math.random() * 6}
        mouthRadius={40 + Math.random() * 4}
      />
    );
  });

export default App;
