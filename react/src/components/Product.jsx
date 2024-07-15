// components/Product.jsx
import React from "react";

const Product = ({ product, addToCart }) => {
  const { id, brand, type, color, size, price, category } = product;

  return (
    <div className="card" style={{ flex: "1", minWidth: "300px", maxWidth: "45%" }}>
      <div className="card-body">
        <h5 className="card-title">Brand: {brand}</h5>
        <div className="card-text">Type: {type}</div>
        <div className="card-text">Color: {color}</div>
        <div className="card-text">Size: {size}</div>
        <div className="card-text">Price: $ {price}</div>
        <div className="card-text">Category: {category}</div>
        <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
