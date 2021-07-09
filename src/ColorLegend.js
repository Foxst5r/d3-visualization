import { useState } from "react";
export const ColorLegend = ({
  colorScale,
  tickSpacing = 20,
  tickSize = 10,
  tickTextOffSet = 15,
  onHover,
  fadeOpacity = 0.2,
}) => {
  const [current, setCurrent] = useState(null);

  return (
    <g>
      {colorScale.domain().map((domainValue, i) => {
        return (
          <g
            opacity={current && current !== domainValue ? fadeOpacity : 1}
            key={i}
            className="tick"
            transform={`translate(0,${i * tickSpacing})`}
            onMouseEnter={() => {
              setCurrent(domainValue);
              onHover(domainValue);
            }}
            onMouseOut={() => {
              setCurrent(null);
              onHover(null);
            }}
          >
            <circle fill={colorScale(domainValue)} r={tickSize}></circle>
            <text x={tickTextOffSet} dy=".32em">
              {domainValue}{" "}
            </text>
          </g>
        );
      })}
    </g>
  );
};

//Empty component
// export const ColorLegend = () => {
//     return <div></div>;
