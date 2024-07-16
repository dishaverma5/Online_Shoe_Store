import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = ({ products, addToCart }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.shoeDetails.shoe_id.toString() === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { brand, shoe_type, color, size, price, additionalFeatures } = product.shoeDetails;

  return (
    <div className="container">
      <h2>Product Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Brand: {brand}</h5>
          <div className="card-text">Type: {shoe_type}</div>
          <div className="card-text">Color: {color}</div>
          <div className="card-text">Size: {size}</div>
          <div className="card-text">Price: $ {price}</div>
          <div className="card-text">Additional Features:</div>
          <ul>
            <li>Popular: {additionalFeatures.isPopular ? "Yes" : "No"}</li>
            <li>In Stock: {additionalFeatures.inStock ? "Yes" : "No"}</li>
            <li>On Sale: {additionalFeatures.onSale ? "Yes" : "No"}</li>
          </ul>
          <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
