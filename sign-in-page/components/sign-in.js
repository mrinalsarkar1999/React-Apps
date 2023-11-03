import React, { useState, useRef } from "react";
import { flushSync } from "react-dom";
import Register from "./register";
import LoginPage from "./login";
export default function SignIn() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const myRef = useRef(null);
  const myRef1 = useRef(null);

  function handleSignIn(e) {
    flushSync(() => {
      if (e === "clicked") {
        console.log("Button clicked");
        setIsSignIn({ isSignIn: true });
      }
    });

    myRef.current.scrollIntoView();
  }
  function handleLogin(e) {
    flushSync(() => {
      if (e === "clicked") {
        console.log("Button clicked");
        setIsLogin({ isLogin: true });
		if(isSignIn){
			setIsSignIn({ isSignIn: false });
		}
      }
    });

    myRef1.current.scrollIntoView({ block: 'end',  behavior: 'smooth' });
  }

  return (
    <>
      <div className="wrapper">
        <div className="grid-container">
          <div className="context">
            <h2 style={{ color: "rgb(65, 177, 115)" }}>Join our community</h2>
            <h4 style={{ color: "rgb(114, 168, 53)" }}>
              30 day free hassle free trial
            </h4>
            <p>
              Gain access to our full library of tutorials along with expert
              code rawiews perfect for any developers who are serious about
              honing their skills.
            </p>
          </div>
		  <div className="why-us">
            <h3>Why us?</h3>
            <ul>
              <li>Tutorials by industry experts</li>
              <li>Peer and expert code review</li>
              <li>Coding exercises</li>
              <li>Access to our Github repo</li>
              <li>Community forum</li>
              <li>New videos every week</li>
            </ul>
          </div>
          <div className="sign-in">
            <h3>Monthly subscription</h3>
            <span>
              <h4>$29</h4>
              per month
            </span>
            <p>Full access for less than $1 a day</p>
            <div className="button">
              <button
                className="sign-in-button btn btn-default"
                onClick={() => handleSignIn("clicked")}
              >
                Sign up
              </button>
              <button
                className="sign-in-button btn btn-default"
                onClick={() => handleLogin("clicked")}
              >
                Log In
              </button>
            </div>
          </div>
          
        </div>
      </div>
	   {isSignIn && 
		<div className="register" ref={myRef}>
			<Register />
		</div>
	  }
      
      {isLogin && 
	  <div className="login" ref={myRef1}>
			<LoginPage />
		</div>
	  }
    </>
  );
}
