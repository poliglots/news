import "bulma/css/bulma.min.css";
import "./App.css";
import data from "../dist/news.json";
import NewsCard from "./comp/NewsCard";
import Nav from "./comp/Nav";

function App() {
  return (
    <>
      <Nav></Nav>
      <div id="main">
        {data
          .sort((a, b) => a.headline.localeCompare(b.headline))
          .map((newsLog, index) => (
            <NewsCard key={index} newsLog={newsLog}></NewsCard>
          ))}
      </div>
    </>
  );
}

export default App;
