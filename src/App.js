import logo from "./logo.svg";
import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import { csv, csvParse, csvFormat } from "d3";
import { message } from "./message";
const csvUrl =
  "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then((data) => {
      setData(data);
    });
  }, []);
  // const fetchText = async (url) => {
  //   const response = await fetch(url);
  //   return await response.text();
  // };

  // fetchText(csvUrl).then((text) => {
  //   const data = csvParse(text);

  //   console.log(message);
  // });
  // //   fetch(url).then((response) => {
  //   response.text().then((text) => {
  //     console.log(text);
  //   });
  // });
  return <div> Data is {data ? message(data) : "loading"} </div>;
}

export default App;
