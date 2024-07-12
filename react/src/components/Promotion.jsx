import React from "react";

const Promotion = (props) => {
  return (
    <div className="card">
      <div className="card bg-light">
        <div className="card-text">{props.data.feature}</div>
        <div className="card-text">
          <a href="#">add to cart</a>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
