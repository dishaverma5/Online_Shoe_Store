import React from "react";

const Promotion = ({ data }) => {
  return (
    <div className="card bg-light">
      <div className="card-text">{data.feature}</div>
      <div className="card-text">
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  );
};

export default Promotion;
