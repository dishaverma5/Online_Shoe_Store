import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = ({ products, addToCart }) => {
  const { productId } = useParams();
  const product = products.find(
    (item) => item.shoe_id.toString() === productId
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const { brand, shoe_type, color, size, price } = product.shoeDetails;
  const { isPopular, inStock, onSale } = product.additionalFeatures;

  return (
    <div className="container">
      <h2 className="my-4">{brand}</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{brand}</h5>
          <p className="card-text">Type: {shoe_type}</p>
          <p className="card-text">Color: {color}</p>
          <p className="card-text">Size: {size}</p>
          <p className="card-text">Price: ${price}</p>
          <p className="card-text">
            Popular: {isPopular ? "Yes" : "No"}
          </p>
          <p className="card-text">
            In Stock: {inStock ? "Yes" : "No"}
          </p>
          <p className="card-text">
            On Sale: {onSale ? "Yes" : "No"}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
