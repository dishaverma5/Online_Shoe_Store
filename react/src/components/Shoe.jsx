import React from "react";

const Shoe = ({ product }) => {
  if (!product || !product.shoeDetails) {
    return <div className="card">Product data is unavailable</div>;
  }

  const { brand, shoe_type, color, size, price } = product.shoeDetails;
  const { isPopular, inStock, onSale } = product.additionalFeatures;

  return (
    <div
      className="card"
      style={{ flex: "1", minWidth: "300px", maxWidth: "45%" }}
    >
      <div className="card-body">
        <h5 className="card-title">Brand: {brand}</h5>
        <div className="card-text">Type: {shoe_type}</div>
        <div className="card-text">Color: {color}</div>
        <div className="card-text">Size: {size}</div>
        <div className="card-text">Price: $ {price}</div>
        <div className="card-text">Popular: {isPopular ? "Yes" : "No"}</div>
        <div className="card-text">In Stock: {inStock ? "Yes" : "No"}</div>
        <div className="card-text">On Sale: {onSale ? "Yes" : "No"}</div>
      </div>
      <div
        className="card-footer"
        style={{ display: "flex", justifyContent: "space-between" }}
      ></div>
      <button className="btn btn-primary">Add to Cart</button>
    </div>
  );
};

export default Shoe;
