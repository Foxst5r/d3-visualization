import { line, path, curveNatural } from "d3";
export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  cirlceRadius,
}) => {
  return (
    <g className="marks">
      <path
        fill="none"
        stroke="black"
        d={line()
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))
          .curve(curveNatural)(data)}
      />
      {data.map((d, idx) => {
        return (
          <circle
            key={idx}
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={cirlceRadius}
          >
            <title>{tooltipFormat(xValue(d))}</title>
          </circle>
        );
      })}
    </g>
  );
};
