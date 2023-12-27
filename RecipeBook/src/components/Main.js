import { useState } from "react";
import { useRef } from "react";
import "../css/App.css";
import Intro from "./Intro";
import Footer from "./Footer";
import Recipes from "./Recipes";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { flushSync } from "react-dom";
import Socials from "./Socials";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Main() {
  var [isVisible, setIsVisible] = useState(false);
  var [isSocial, setIsSocial] = useState(false);
  const ref = useRef(null);
  const ref1 = useRef(null);
  const [items, setItems] = useState([]);
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

  const getData = () => {
    const getFromFirebase = app.firestore().collection("todos");
    getFromFirebase.onSnapshot((querySnapShot) => {
      const saveFirebaseTodos = [];
      querySnapShot.forEach((doc) => {
        saveFirebaseTodos.push(doc.data());
      });
      flushSync(() => {
        setItems(saveFirebaseTodos);
      });
    });
  };

  function HandleRecipes(e) {
    e.preventDefault();
    flushSync(() => {
      setIsVisible(true);
    });
    getData();
    ref.current.scrollIntoView();
  }
  function handleHome(e) {
    e.preventDefault(e);
    flushSync(() => {
      setIsVisible(false);
      setIsSocial(false);
    });
  }
  function handleSocials(e) {
    e.preventDefault(e);
    flushSync(() => {
      setIsSocial(true);
    });
    ref1.current.scrollIntoView();
  }

  return (
    <div className="App">
      <div className="scroll-bg"></div>
      <header className="App-header">
        <nav className="navigation">
          <div className="logo">
            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
          </div>

          <ul className="list">
            <li className="list-items" onClick={handleHome}>
              Home
            </li>
            <li className="list-items" onClick={HandleRecipes}>
              recipes
            </li>
            <li className="list-items" onClick={handleSocials}>
              Socials
            </li>
          </ul>
        </nav>
      </header>
      <Intro></Intro>
      <div ref={ref}>{isVisible && <Recipes data={items}></Recipes>}</div>
      <div ref={ref1}>{isSocial && <Socials></Socials>}</div>
      <Footer></Footer>
    </div>
  );
}

export default Main;
