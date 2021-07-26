import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";
import { useMemo } from "react";
const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

// const populationRadius = (population) => {
//   return population * 0.0000009;
// };

export const Marks = ({
  worldAtlas: { land, interiors },
  data,
  sizeScale,
  sizeValue,
}) => {
  return (
    <g className="marks">
      {useMemo(
        () => (
          <>
            <path className="sphere" d={path({ type: "Sphere" })} />
            <path className="graticules" d={path(graticule())} />;
            {land.features.map((feature, idx) => {
              return <path className="land" key={idx} d={path(feature)} />;
            })}
            <path className="interiors" d={path(interiors)} />;
          </>
        ),
        [path, graticule, land, interiors]
      )}
      {data.map((d, idx) => {
        const [x, y] = projection(d.coords);
        return <circle key={idx} cx={x} cy={y} r={sizeScale(sizeValue(d))} />;
      })}
    </g>
  );
};
