import logo from "./logo.svg";
import "./App.css";

function App() {
  const fetchText = async (url) => {
    const response = await fetch(url);
    return await response.text();
  };
  const csvUrl =
    "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

  fetchText(csvUrl).then((text) => {
    console.log(text);
  });
  //   fetch(url).then((response) => {
  //   response.text().then((text) => {
  //     console.log(text);
  //   });
  // });
  return <div className="App"></div>;
}

export default App;
