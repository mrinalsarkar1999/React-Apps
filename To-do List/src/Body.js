import React, { useState } from "react";

export default function Body() {
  const [listArray, setListArray] = useState([]);
  var [key, setKey] = useState(0);

  function updateList(event) {
    setListArray((prevListArray) => {
      const value = document.getElementById("input-text").value;
      document.getElementById("input-text").value = "";
      setKey((prevKey) => prevKey + 1);
      console.log(key);
      const newValue = { index: key, text: value };
      var newString = value.replace(/\n/g, "");

      if (newString !== "") {
        return [...prevListArray, newValue];
      } else if (newString === "") {
        window.alert("please enter a value");
        return [...prevListArray];
      } else return [...prevListArray];
    });

    event.preventDefault();
  }

  function removeItem(i) {
    setListArray((prevA) => prevA.filter((item) => item.index !== i));
  }

  return (
    <div className="wrapper">
      <div className="input-area">
        <textarea
          type="textarea"
          className="input-text md-textarea form-control"
          id="input-text"
        />
        <button className="add-button btn btn-default" onClick={updateList}>
          Add item
        </button>
      </div>
      <ul className="items">
        {listArray.map((i) => (
          <li key={i.index} className="list-items">
            <p className="list-items-text">{i.text}</p>
            <button onClick={() => removeItem(i.index)}>remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
