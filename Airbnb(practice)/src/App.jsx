import Navbar from "./assets/Navigation.jsx";
import Intro from "./assets/Intro.jsx";
import Card from "./assets/Card.jsx";
import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const url = "https://api.github.com/users";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const cArray = users.map((item) => (
    <Card
      key={item.id}
      /*Spreading the object like we do in ES6*/
      {...item}
    />
  ));
  if (isError) {
    return (
      <div className="wrapper">
        <Navbar />
        <Intro />
        <div className="cardContainer">
          <h1>Error while fetching data...</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="wrapper">
      <Navbar />
      <Intro />
      {isLoading || isError ? (
        <h1>Loading...</h1>
      ) : (
        <div className="cardContainer">{cArray}</div>
      )}
    </div>
  );
}
