import { useState, useEffect } from "react";
import { csv } from "d3";
const csvUrl =
  "https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";
export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d["Total Dead and Missing"] = +d["Total Dead and Missing"];
      d["Reported Date"] = new Date(d["Reported Date"]);
      return d;
    };
    csv(csvUrl, row).then((data) => {
      console.log(data[0]);
      setData(data);
    });
  }, []);
  return data;
};
