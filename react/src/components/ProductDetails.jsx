/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductRecommendations from "./ProductRecommendations";

const ProductDetails = ({ products, addToCart }) => {
  const { productId } = useParams();
  const product = products.find(
    (item) => item.shoe_id.toString() === productId
  );

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (product) {
      fetch(`http://localhost:5000/recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shoe_id: product.shoe_id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setRecommendations(data);
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error);
        });
    }
  }, [product]);

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
          <p className="card-text">Popular: {isPopular ? "Yes" : "No"}</p>
          <p className="card-text">In Stock: {inStock ? "Yes" : "No"}</p>
          <p className="card-text">On Sale: {onSale ? "Yes" : "No"}</p>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <ProductRecommendations recommendations={recommendations} />
    </div>
  );
};

export default ProductDetails;*/

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductRecommendations from "./ProductRecommendations";

const ProductDetails = ({ products, addToCart }) => {
  const { productId } = useParams();
  const product = products.find(
    (item) => item.shoe_id.toString() === productId
  );
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    if (product) {
      fetch(`http://localhost:5000/recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shoe_id: productId }),
      })
        .then((response) => response.json())
        .then((data) => setRecommendedProducts(data))
        .catch((error) => console.error("Error fetching recommendations:", error));
    }
  }, [product, productId]);

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
      <ProductRecommendations recommendedProducts={recommendedProducts} />
    </div>
  );
};

export default ProductDetails;

