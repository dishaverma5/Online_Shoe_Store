import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products, addToCart }) => {
  const { productId } = useParams();

  // Find the product that matches the productId
  const product = products.find(product => product.shoeDetails.shoe_id.toString() === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { brand, shoe_type, color, size, price, additionalFeatures } = product.shoeDetails;

  return (
    <div className="product-details">
      <h2>{brand}</h2>
      <p>Type: {shoe_type}</p>
      <p>Color: {color}</p>
      <p>Size: {size}</p>
      <p>Price: ${price}</p>
      <div>
        <h3>Additional Features:</h3>
        <p>Popular: {additionalFeatures.isPopular ? "Yes" : "No"}</p>
        <p>In Stock: {additionalFeatures.inStock ? "Yes" : "No"}</p>
        <p>On Sale: {additionalFeatures.onSale ? "Yes" : "No"}</p>
      </div>
      <button onClick={() => addToCart(product)} className="btn btn-primary">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
