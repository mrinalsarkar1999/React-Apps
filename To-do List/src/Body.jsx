import { useState } from "react";
let nextId = 0;

const Body = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const handleAdd = (e) => {
    if (input !== "" && input !== null) {
      e.preventDefault();
      setItems([...items, { id: nextId++, item: input }]);
      setInput("");
    } else alert("please enter something");
  };

  return (
    <div className="container">
      <h1>Simple ToDo</h1>
      <input
        type="text"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
        className="mainInput"
      />
      <button onClick={handleAdd} className="btn">
        Add item
      </button>
      <ul>
        {items.map((a) => {
          return (
            <li className="lineItems" key={a.id}>
              <h4>{a.item}</h4>
              <button
                onClick={() => {
                  setItems(items.filter((f) => f.id !== a.id));
                }}
                style={{
                  height: "2rem",
                  width: "4rem",
                  margin: "0",
                  padding: "0",
                }}
                className="btn"
              >
                clear
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Body;
