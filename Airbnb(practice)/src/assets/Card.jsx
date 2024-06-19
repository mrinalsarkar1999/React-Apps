import React from "react";

export default function Card(props) {
  let badgeText;
  if (props.site_admin) {
    badgeText = "ONLINE";
  }

  return (
    <div className="card">
      {/*Card badge*/}
      {badgeText && <div className="card-badge">{badgeText}</div>}
      {/*Card image*/}
      <img
        src={props.avatar_url}
        className="card-image"
        alt={props.login}
      ></img>
      {/*Stats of the card that include ratings*/}
      <div className="card-stats">
        <img src="./icons/star.png" alt="star icon" className="star-img"></img>
        <span className="rating">5</span>
        <span className="review-count">(100)&nbsp;*&nbsp;</span>
        <span className="country">Earth</span>
      </div>
      {/*Details of the person*/}
      <div className="card-details">
        <p className="card-title">{props.login}</p>
        <span className="price">From ${props.id}</span>
        <span> / person</span>
      </div>
    </div>
  );
}
