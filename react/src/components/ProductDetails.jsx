// components/ProductDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products, addToCart }) => {
  const { productId } = useParams();
  const product = products.find(item => item.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { brand, type, color, size, price, category } = product;

  return (
    <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
      <img src={product.image} className="card-img-top" alt={brand} />
      <div className="card-body">
        <h5 className="card-title">Brand: {brand}</h5>
        <div className="card-text">Type: {type}</div>
        <div className="card-text">Color: {color}</div>
        <div className="card-text">Size: {size}</div>
        <div className="card-text">Price: ${price}</div>
        <div className="card-text">Category: {category}</div>
      </div>
      <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
