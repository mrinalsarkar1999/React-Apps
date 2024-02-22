import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { v4 as uuid } from "uuid";

export default function Input(data) {
  var [cusine, setCusine] = useState("");
  var [recipeName , setRecipeName] = useState("");
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
    if(recipeName && recipeText !== ""){
      if(recipeName && recipeText!== null){
        const saveToFirebase = app.firestore();
        saveToFirebase.collection("todos").add({
          id: uuid(),
          recipeName: recipeName.toLowerCase(),
          recipeContent: recipeText,
          cusine : cusine,
        });
        setRecipeName("");
        setRecipeText("");
        setCusine("");
        alert("Recipe added");
      }
    }
    else{
      alert("None of the fields can be empty! Please provide an input.");
      setRecipeName("");
      setRecipeText("");
    }
  }

  return (
    <div className="input-container">
      <header className="cusine-heading">
        <h1>{recipeName}</h1>
      </header>

      <input
        type="text"
        className="cusine-input"
        placeholder="Name of your dish"
        value = {recipeName}
        onChange={(a)=>{setRecipeName(a.target.value)}}
      ></input>

      <label htmlFor="cusine">Choose a Cusine</label>
  <select id="cusine" name="cusine" onChange={(e)=>{setCusine(e.target.value)}}>
    <option>------</option>
    <option value="Indian">Indian</option>
    <option value="Korean">Korean</option>
    <option value="Indo-Chinese fusion">Indo-Chinese fusion</option>
    <option value="Mexican">Mexican</option>
    <option value="American">American</option>
  </select>
      <textarea
        className="input-area"
        placeholder="Ingredients"
        value = {recipeText}
        onChange={(b)=>{setRecipeText(b.target.value)}}
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
