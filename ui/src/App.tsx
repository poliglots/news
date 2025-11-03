import "bulma/css/bulma.min.css";
import "./App.css";
import data from "../../dist/news.json";
import lastRun from "../../dist/time.json";
import NewsCard from "./NewsCard";
import Nav from "./Nav";
import { useState } from "react";

function App() {
  const [filterBy, setFilterBy] = useState("");

  const handleInputChange = (valueFromChild: string) => {
    setFilterBy(valueFromChild);
  };

  return (
    <div>
      <Nav
        lastUpdate={lastRun.time.split("GMT")[0]}
        onInputChange={handleInputChange}
      ></Nav>
      <div id="main">
        {data
          .sort((a, b) => a.headline.localeCompare(b.headline))
          .filter((item) =>
            item.link.toLowerCase().includes(filterBy.toLowerCase())
          )
          .map((newsLog, index) => (
            <NewsCard key={index} newsLog={newsLog}></NewsCard>
          ))}
      </div>
    </div>
  );
}

export default App;
