export const Marks = ({
  data,
  xScale,
  yScale,
  colorScale,
  xValue,
  yValue,
  colorValue,
  tooltipFormat,
  cirlceRadius,
}) => {
  return data.map((d, idx) => {
    // console.log(d, idx);
    return (
      <circle
        className="mark"
        key={idx}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        fill={colorScale(colorValue(d))}
        r={cirlceRadius}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    );
  });
};
