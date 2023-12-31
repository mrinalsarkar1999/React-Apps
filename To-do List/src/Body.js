import React, { useState } from "react";

export default function Body() {
  const [listArray, setListArray] = useState([]);
  var [key, setKey] = useState(0);

  //Function that gets the state array and updates it with the text received via user input
  function updateList(event) {
    //Updating the listArray state
    setListArray((prevListArray) => {
      //Get the user entered text by using document.getElementById
      const value = document.getElementById("input-text").value;
      document.getElementById("input-text").value = "";
      setKey((prevKey) => prevKey + 1);
      //replace line breaks in text with space
      const newValue = { index: key, text: value };

      //Check if the input text is not empty or does not have only spaces. If true we add user input text to the state array
      if (value !== "" && /\S/.test(value)) {
        return [...prevListArray, newValue];
        //check if input straing has only spaces. If true we display an alert to enter something
      } else if (!/\S/.test(value)) {
        window.alert("please enter something");
        return [...prevListArray];
      } else return [...prevListArray];
    });

    event.preventDefault();
  }

  //Function that is used to remove an item using the index value
  function removeItem(i) {
    setListArray((prevA) => prevA.filter((item) => item.index !== i));
  }

  return (
    <div className="wrapper">
      <div className="input-area">
        <textarea
          type="textarea"
          className="input-text md-textarea"
          id="input-text"
        />
        <button className="add-button btn btn-default" onClick={updateList}>
          Add item
        </button>
      </div>
      <div className="list-wrapper">
        <ul className="items">
          {/* map through the state array and for each item create a list element
        with the user input text and a remove button */}
          {listArray.map((i) => (
            <li key={i.index} className="list-items">
              <p className="list-items-text">{`${i.text}`}</p>
              <button
                className="btn btn-danger delete"
                onClick={() => removeItem(i.index)}
              >
                <i className="fas fa-trash delete-icons"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
