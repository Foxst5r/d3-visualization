import { max, scaleSqrt } from "d3";
import { Marks } from "./Marks";
import { useMemo } from "react";

const sizeValue = (d) => d["Total Dead and Missing"];
const maxRadius = 15;

export const BubbleMap = ({ worldAtlas, data, filteredData }) => {
  const sizeScale = useMemo(
    () =>
      scaleSqrt()
        .domain([0, max(data, sizeValue)])
        .range([0, maxRadius]),
    [data, maxRadius, sizeValue]
  );

  return (
    <Marks
      worldAtlas={worldAtlas}
      data={filteredData}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  );
};
