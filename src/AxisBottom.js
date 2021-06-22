export const AxisBottom = ({ xScale, innerHeight }) => {
  return xScale.ticks().map((tickValue) => (
    <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} stroke="black" />
      <text style={{ textAnchor: "middle" }} dy=".71em" y={innerHeight + 5}>
        {tickValue}
      </text>
    </g>
  ));
};
