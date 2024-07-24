import { useEffect, useState } from "react";
import "./App.css";
import MoviesDisplay from "./assets/MoviesDisplay";
import axios from "axios";
import { flushSync } from "react-dom";

function App() {
  const [search, setSearch] = useState("");
  const [isVis, setIsVis] = useState(false);
  const initialURL = "https://www.omdbapi.com/?apikey=a2526df0&s=";
  const [url, setURL] = useState("");

  const [response, setResp] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState([]);

  useEffect(() => {
    // change name
    const fetchData = async () => {
      try {
        const resp = await axios.get(url);
        console.log(resp.data.Response);
        if (!resp.data.Response) {
          console.log("failed");
          setResp([]);
          setFilteredResponse([]);
          return;
        }
        // change to response

        if (resp.data.Response !== "False") {
          const resp1 = await resp.data.Search;
          flushSync(() => {
            setResp(resp1);
            setFilteredResponse(resp1);
          });
          console.log(resp.data.Response);
          console.log("Inside If");
          setIsVis(true);
        } else {
          setIsVis(false);
          alert("No records found");
          setResp([]);
          setFilteredResponse([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // invoke fetch data
    fetchData();
  }, [url]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (event) => {
    event.preventDefault();
    const filterValue = event.target.value;
    if (filterValue === "all") {
      setResp(filteredResponse);
      return;
    }
    console.log(filterValue);
    const newList = filteredResponse.filter(
      (movie) => movie.Type === filterValue
    );
    console.log(newList);
    setResp(newList);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setURL(initialURL + search);
    console.log(url);
  };

  return (
    <main>
      <form>
        <input
          type="text"
          placeholder="Enter a movie"
          value={search}
          onChange={handleChange}
          className="imput"
        />
        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </form>
      {isVis && (
        <div className="filter">
          <select name="cars" id="cars" onChange={handleFilter}>
            <option value="all">All</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="game">Game</option>
          </select>
        </div>
      )}

      <section>
        {isVis && <MoviesDisplay result={response} url={url}></MoviesDisplay>}
      </section>
    </main>
  );
}

export default App;
