export const ColorLegend = ({
  colorScale,
  tickSpacing = 20,
  tickSize = 10,
  tickTextOffSet = 15,
}) => {
  return (
    <g>
      {colorScale.domain().map((domainValue, i) => {
        return (
          <g className="tick" transform={`translate(0,${i * tickSpacing})`}>
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
