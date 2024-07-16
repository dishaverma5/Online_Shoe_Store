import React from "react";
import { Link } from "react-router-dom";

const Shoe = ({ product }) => {
  if (!product) {
    return <div className="card">Product data is unavailable</div>;
  }

  const { brand, shoe_type, color, size, price, shoe_id } = product.shoeDetails;

  return (
    <div className="card" style={{ flex: "1", minWidth: "300px", maxWidth: "45%" }}>
      <div className="card-body">
        <h5 className="card-title">Brand: {brand}</h5>
        <div className="card-text">Type: {shoe_type}</div>
        <div className="card-text">Color: {color}</div>
        <div className="card-text">Size: {size}</div>
        <div className="card-text">Price: $ {price}</div>
      </div>
      <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={`/product/${product.shoe_id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Shoe;
