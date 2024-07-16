import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products, addToCart }) => {
  const { productId } = useParams();
  const product = products.find(p => p.shoe_id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  const { brand, shoe_type, color, size, price } = product.shoeDetails;

  return (
    <div className="product-details">
      <h2>{brand}</h2>
      <p>Type: {shoe_type}</p>
      <p>Color: {color}</p>
      <p>Size: {size}</p>
      <p>Price: ${price}</p>
      <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
