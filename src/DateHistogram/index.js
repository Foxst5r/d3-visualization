import { Marks } from "./Marks";
import {
  timeFormat,
  scaleLinear,
  scaleTime,
  max,
  extent,
  bin,
  timeMonths,
  sum,
  brushX,
  select,
} from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { useRef, useEffect, useMemo } from "react";

const xAxisTickFormat = timeFormat("%m/%d/%Y");

const yValue = (d) => d["Total Dead and Missing"];
const yAxisLabel = "Total Dead and Missing";

export const DateHistorgram = ({
  data,
  width,
  height,
  setBrushExtent,
  xValue,
}) => {
  const margin = { top: 0, right: 30, bottom: 20, left: 45 };

  const brushRef = useRef();

  const xAxisLabel = "Reported Date";

  const xAxisLabelOffset = 80;
  const yAxisLabelOffset = 30;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.left;

  const xScale = useMemo(
    () =>
      scaleTime().domain(extent(data, xValue)).range([0, innerWidth]).nice(),
    [innerWidth, data, xValue]
  );

  const binnedData = useMemo(() => {
    const [start, stop] = xScale.domain();
    return bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(start, stop))(data)
      .map((array) => {
        return {
          y: sum(array, yValue),
          x0: array.x0,
          x1: array.x1,
        };
      });
  }, [xValue, xScale, data, yValue]);

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(binnedData, (d) => d.y)])
        .range([innerHeight, 0])
        .nice(),
    [binnedData, innerHeight]
  );

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush end", (event) => {
      setBrushExtent(event.selection && event.selection.map(xScale.invert));
    });
  }, [innerHeight, innerWidth]);

  return (
    <>
      <rect width={width} height={height} fill="white" />
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffSet={5}
        ></AxisBottom>
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          tickOffSet={5}
        ></AxisLeft>
        <text
          className="axis-label"
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + xAxisLabelOffset}
        >
          {xAxisLabel}
        </text>
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90) `}
        >
          {yAxisLabel}
        </text>
        <Marks
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={(d) => d}
          innerHeight={innerHeight}
        ></Marks>
        <g ref={brushRef} />
      </g>
    </>
  );
};
