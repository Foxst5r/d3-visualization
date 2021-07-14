export const Marks = ({
  binnedData,
  xScale,
  yScale,
  tooltipFormat,
  innerHeight,
}) => {
  return (
    <g className="marks">
      {/* <path
          fill="none"
          stroke="black"
          d={line()
            .x((d) => xScale(xValue(d)))
            .y((d) => yScale(yValue(d)))
            .curve(curveNatural)(data)}
        /> */}
      {binnedData.map((d, idx) => {
        return (
          <rect
            className="mark"
            key={idx}
            x={xScale(d.x0)}
            y={yScale(d.y)}
            width={xScale(d.x1) - xScale(d.x0)}
            height={innerHeight - yScale(d.y)}
          >
            <title>{tooltipFormat(d.y)}</title>
          </rect>
        );
      })}
    </g>
  );
};
