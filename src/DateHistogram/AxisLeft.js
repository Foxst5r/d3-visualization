export const AxisLeft = ({ yScale, innerWidth, tickOffSet = 3 }) => {
  return yScale.ticks().map((tickValue, idx) => {
    console.log(tickValue, idx);
    return (
      <g
        key={idx}
        className="tick"
        transform={`translate(0,${yScale(tickValue)})`}
      >
        <line x2={innerWidth} />
        <text
          key={tickValue}
          style={{ textAnchor: "end" }}
          x={-tickOffSet}
          dy=".32em"
        >
          {tickValue}
        </text>
      </g>
    );
  });
};
