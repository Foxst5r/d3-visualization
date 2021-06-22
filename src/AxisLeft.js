export const AxisLeft = ({ yScale }) => {
  return yScale.domain().map((tickValue) => (
    <text
      key={tickValue}
      style={{ textAnchor: "end" }}
      x={-3}
      dy=".32em"
      y={yScale(tickValue) + yScale.bandwidth() / 2}
    >
      {tickValue}
    </text>
  ));
};
