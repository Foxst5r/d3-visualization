import logo from "./logo.svg";
import "./App.css";

import { useData } from "./useData";
import { Marks } from "./Marks";
const width = 1000;
const height = 500;

function App() {
  const data = useData();

  if (!data) {
    return <pre>Loading... </pre>;
  }

  return (
    <svg width={width} height={height}>
      <Marks data={data}></Marks>
    </svg>
  );
}

export default App;
