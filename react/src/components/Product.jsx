// components/Product.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const { id, brand, type, color, size, price, category, image } = product;

  return (
    <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
      <img src={image} className="card-img-top" alt={brand} />
      <div className="card-body">
        <h5 className="card-title">Brand: {brand}</h5>
        <div className="card-text">Type: {type}</div>
        <div className="card-text">Color: {color}</div>
        <div className="card-text">Size: {size}</div>
        <div className="card-text">Price: ${price}</div>
        <div className="card-text">Category: {category}</div>
      </div>
      <Link to={`/product/${id}`}>
        <button className="btn btn-primary">View Details</button>
      </Link>
    </div>
  );
};

export default Product;
