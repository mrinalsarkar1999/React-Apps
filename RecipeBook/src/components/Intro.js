import React from "react";
import { useState, useRef } from "react";
import Input from "./Input";
import { flushSync } from "react-dom";

export default function Intro() {
  var [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  function handleGetStarted() {
    flushSync(() => {
      setIsVisible(true);
    });
    ref.current.scrollIntoView();
  }

  return (
    <>
      <div className="intro">
        <h1>OH MY GOD!!</h1>
        <h3>I can't belive you're here.</h3>
        <p>
          So.... What recipe do we fancy today? I hope it's something
          scrumptious.
        </p>
        <button className="start-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
      <div ref={ref}>{isVisible && <Input></Input>}</div>
    </>
  );
}
