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
        {data.map((item, index) => (
          <NewsCard
            key={index}
            headline={item.headline}
            news={item.news}
            link={item.link}
          ></NewsCard>
        ))}
      </div>
    </>
  );
}

export default App;
