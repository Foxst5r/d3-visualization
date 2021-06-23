import { useState, useEffect } from "react";
import { csv } from "d3";
const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/UN_Population_2019.csv";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = parseFloat(d["2020"]) * 1000;
      return d;
    };
    csv(csvUrl, row).then((data) => {
      // console.log(data[0]);
      setData(data.slice(0, 10));
    });
  }, []);
  return data;
};
