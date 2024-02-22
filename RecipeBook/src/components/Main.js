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

function Main() {
  var [isVisible, setIsVisible] = useState(false);
  var [isSocial, setIsSocial] = useState(false);
  var [isHovering,setIsHovering] = useState(false);
  var [search,setSearch] = useState("");
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

  function getData(i){
    let getFromFirebase;
    if(i!==null && i!==""){
      getFromFirebase = app.firestore().collection("todos").where('cusine', '==', i);
    }
    else{
      getFromFirebase = app.firestore().collection("todos");
    }

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

  function getSearchData(){
    const getFromFirebase = app.firestore().collection("todos").where('recipeName', '==', search);
    getFromFirebase.onSnapshot((querySnapShot) => {
      const saveFirebaseTodos = [];
      querySnapShot.forEach((doc) => {
        saveFirebaseTodos.push(doc.data());
      });
      flushSync(() => {
        setItems(saveFirebaseTodos);
      });
    });
  }

  const handleRecipes =(item) =>()=> {
    flushSync(() => {
      setIsVisible(true);
    });
    getData(item);
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
  function handleSearch(){
    flushSync(() => {
      setIsVisible(true);
    });
    getSearchData(search);
    ref.current.scrollIntoView();
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navigation">
          <div className="logo">
            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
          </div>

          <ul className="list">
            <li className="list-items" onClick={handleHome}>
              Home
            </li>
            <li className="list-items" onMouseOver={()=>{setIsHovering(true)}}
          onMouseOut={()=>{setIsHovering(false)}}>recipes
            {isHovering
              && <div className="dropdown">
              <div className="dropdown-content">
              <ul>
                <li onClick={handleRecipes("Indian")}>Indian</li>
                <li onClick={handleRecipes("Korean")}>Korean</li>
                <li onClick={handleRecipes("Indo-Chinese fusion")}>Indo-Chinese fusion</li>
                <li onClick={handleRecipes("Mexican")}>Mexican</li>
                <li onClick={handleRecipes("American")}>American</li>
              </ul>
              </div>
            </div>
          }
            </li>
            <li className="list-items" onClick={handleSocials}>
              Socials
            </li>
          </ul>
        </nav>
      </header>
      <div className="search-input">
        <div className="form-outline" data-mdb-input-init>
          <input type="search" id="form1" className="form-control" onChange = {(e)=>{setSearch(e.target.value.toLowerCase())}}/>
          <button type="button" className="btn btn-dark" onClick = {handleSearch}>
            <i className="bi bi-search"></i>
          </button>
        </div>

      </div>
      <Intro></Intro>
        <div ref={ref}>{isVisible && <Recipes data={items}></Recipes>}</div>
        <div ref={ref1}>{isSocial && <Socials></Socials>}</div>
      <Footer></Footer>
    </div>
  );
}

export default Main;
