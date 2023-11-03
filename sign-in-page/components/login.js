import userData from "./data";
import React, { useRef } from "react";
import Welcome from "./Welcome";
import { useState } from "react";
import { flushSync } from "react-dom";

export default function LoginPage() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const myRef1 = useRef(null);

  function handleInput(event) {
    flushSync(() => {
      const name = event.target.name;
      const value = event.target.value;
      setData({ ...data, [name]: value });
    });
  }

  function handleLogin() {
    let username;
    let password;
    userData.map((i) => {
      username = i.email;
      password = i.password;
    });
    if (data.username === username && data.password === password) {
      console.log("Login succesfull");
      flushSync(() => {
        setIsVisible({ isVisible: true });
      });
      myRef1.current.scrollIntoView();
    } else {
      alert("Incorrect combination of Username and password");
    }
  }

  return (
    <div className = "login-wrapper">
      <div className="login-form">
        <h1>Log in</h1>
        <div className="content">
          <div className="input-field">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username/Email"
              onChange={handleInput}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="action">
          <button id="signin" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
      <div ref={myRef1}>{isVisible && <Welcome />}</div>
    </div>
  );
}
