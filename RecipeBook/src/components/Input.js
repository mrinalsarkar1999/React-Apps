import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { v4 as uuid } from "uuid";

export default function Input() {
  var [cusine, setCusine] = useState("");
  var [recipeText, setRecipeText] = useState("");
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDFt1IJhEJMhJWVkwnm8S7eThX9kX04Xlg",
    authDomain: "recipes-41f7a.firebaseapp.com",
    projectId: "recipes-41f7a",
    storageBucket: "recipes-41f7a.appspot.com",
    messagingSenderId: "908046768707",
    appId: "1:908046768707:web:9ef280415f2c1f1f15d2f6",
    measurementId: "G-VHD7660285",
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  function handleSubmit() {
    if (cusine !== "" && recipeText !== "") {
      const saveToFirebase = app.firestore();
      saveToFirebase.collection("todos").add({
        id: uuid(),
        recipeName: cusine,
        recipeContent: recipeText,
      });
      setCusine("");
      setRecipeText("");
    } else {
      alert("Empty fields cannot be added");
    }
  }

  return (
    <div className="input-container">
      <header className="cusine-heading">
        <h1>{cusine}</h1>
      </header>

      <input
        type="text"
        className="cusine-input"
        placeholder="Name of your dish"
        onChange={(e) => setCusine(e.target.value)}
        value={cusine}
      ></input>
      <textarea
        className="input-area"
        placeholder="Ingredients"
        onChange={(q) => {
          setRecipeText(q.target.value);
        }}
        value={recipeText}
      ></textarea>
      <button
        className="btn btn-outline-dark btn-lg submit-recipe-button"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
