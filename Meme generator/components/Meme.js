import memeData from "../memesData";
import React, { useState } from "react";

export default function Meme() {
  const [url, setUrl] = useState("");

  function displayMeme() {
    const memesArray = memeData.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    setUrl(memesArray[randomNumber].url);
  }
  return (
    <main>
      <div className="form">
        <div className="inputs">
          <input type="text" className="input-field" placeholder="Top text" />
          <input
            type="text"
            className="input-field"
            placeholder="Bottom text"
          />
        </div>
        <button className="form-submit" onClick={displayMeme}>
          <h3>Get a new meme image</h3>
        </button>
      </div>
      <div className="memeImage">
        <img src={url} alt="memeImage" id="meme-image" />
      </div>
    </main>
  );
}
