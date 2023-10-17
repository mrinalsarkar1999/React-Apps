import Navbar from "./components/Navigation.js";
import Intro from "./components/Intro.js";
import Card from "./components/Card.js";
import Data from "./components/data.js";

export default function App() {
  const cArray = Data.map((item) => (
    <Card
      key={item.id}
      /*Spreading the object like we do in ES6*/
      {...item}
    />
  ));
  return (
    <>
      <Navbar />
      <Intro />
      <div className="cardContainer">{cArray}</div>
    </>
  );
}
