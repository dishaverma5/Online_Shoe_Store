import React from "react";
import { Link } from "react-router-dom";

const Shoe = ({ product }) => {
  if (!product) {
    return <div className="card">Product data is unavailable</div>;
  }

  const { shoeDetails } = product;

  return (
    <div
      className="card"
      style={{ flex: "1", minWidth: "300px", maxWidth: "45%" }}
    >
      <div className="card-body">
        <h5 className="card-title">Brand: {shoeDetails.brand}</h5>
        <div className="card-text">Type: {shoeDetails.shoe_type}</div>
        <div className="card-text">Color: {shoeDetails.color}</div>
        <div className="card-text">Size: {shoeDetails.size}</div>
        <div className="card-text">Price: $ {shoeDetails.price}</div>
        <div className="card-text">Category: {shoeDetails.category}</div>
      </div>
      <div
        className="card-footer"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link to={`/product/${shoeDetails.shoe_id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Shoe;
