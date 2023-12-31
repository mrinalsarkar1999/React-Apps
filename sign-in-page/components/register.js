import { useState, useRef } from "react";
import "./register.css";
import { flushSync } from "react-dom";
import Data from "./data";
import Welcome from "./Welcome";
export default function Register() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isShown, setIsShown] = useState(false);
  const myRef = useRef(null);

  function handleInput(event) {
    flushSync(() => {
      const name = event.target.name;
      const value = event.target.value;
      setData({ ...data, [name]: value });
    });
  }

  function handleRegister() {
	  const password = data.password;
    const confirmPass = data.confirmPassword;

    const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9@]{8,}$/;
    console.log(/^[a-zA-Z0-9@]*$/.test(password));
	  if(data.password === data.confirmPassword){
		console.log("Succesfull")
		flushSync(() => {
      setIsShown({ isShown: true });
    });
    Data.push(data);
    console.log(Data);
    myRef.current.scrollIntoView();
	  }
	  else{
		  flushSync(()=>{
			  setData({...data, password: "",confirmPassword : ""});
		  });
		  console.log(data);
		  alert("Passwords do not match")
	  }
    
  }

  return (
    <>
      {!isShown && (
        <div className="login-form">
          <h1>Sign in</h1>
          <div className="content">
            <div className="input-field">
              <input
                type="text"
                name="fullName"
                id="name"
                placeholder="Full name"
                onChange={handleInput}
              />
            </div>
            <div className="input-field">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                autoComplete="none"
                onChange={handleInput}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
				value = {data.password}
                onChange={handleInput}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="Confirm password"
				value = {data.confirmPassword}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="action">
            <button id="signin" onClick={handleRegister}>
              Sign in
            </button>
          </div>
        </div>
      )}
      <div ref={myRef}>{isShown && <Welcome />}</div>
    </>
  );
}
