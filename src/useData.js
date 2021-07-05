import { useState, useEffect } from "react";
import { csv } from "d3";
const csvUrl =
  "https://gist.githubusercontent.com/curran/60b40877ef898f19aeb8/raw/9476be5bd15fb15a6d5c733dd79788fb679c9be9/week_temperature_sf.csv";
export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.temperature = +d.temperature;
      d.timestamp = new Date(d.timestamp);
      return d;
    };
    csv(csvUrl, row).then((data) => {
      console.log(data[0]);
      setData(data);
    });
  }, []);
  return data;
};
