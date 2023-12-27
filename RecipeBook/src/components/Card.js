import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default function Card(props) {
  var [isVisible, setIsVisible] = useState(false);
  var [isOpen, setIsOpen] = useState("Expand");
  var [isPopUp, setIsPopUp] = useState(false);
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

  function handleOpen() {
    setIsVisible((pre) => !pre);
    setIsOpen((p) => (p === "Expand" ? "Collapse" : "Expand"));
  }
  function handlePopUp() {
    setIsPopUp(false);
  }

  function handleDelete() {
    setIsPopUp(true);
  }
  function handleDeleteConfirmation(e) {
    e.preventDefault();
    app
      .firestore()
      .collection("todos")
      .where("id", "==", props.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
      });
  }

  return (
    <div className="cards">
      <>
        {!isVisible && (
          <img
            src="https://images.pexels.com/photos/842545/pexels-photo-842545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Recipe banner"
            className="card-banner"
          ></img>
        )}
      </>
      <button className="card-delete" onClick={handleDelete}>
        <i className="bi bi-trash2"></i>
      </button>
      <h4 className="card-title">{props.recipeName}</h4>
      {/* <span className="price">
        <small>{props.recipeContent}</small>
      </span> */}
      <div className="card-expanded-section">
        {isVisible && (
          <div className="recipe-window">{props.recipeContent}</div>
        )}
        <button className="btn btn-outline-info btn-sm " onClick={handleOpen}>
          {isOpen}
        </button>
      </div>
      {isPopUp && (
        <div className="confirmation-container">
          <h1>Are you sure you want to delete the Recipe?</h1>
          <>
            <button onClick={handleDeleteConfirmation}>Yes</button>
            <button onClick={handlePopUp}>No</button>
          </>
        </div>
      )}
    </div>
  );
}
