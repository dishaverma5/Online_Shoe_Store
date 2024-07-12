import React from "react";

const Product = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Price: $ {product.price}</p>
        <p className="card-text">Category: {product.category}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
