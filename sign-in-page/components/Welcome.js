import React from "react";
import "./welcome.css";

export default function Welcome(data) {
  return (
    <div className="welcome">
      <h1>Welcome {data.full}</h1>
    </div>
  );
}
