/*import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductRecommendations = ({ selectedProduct }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // Fetch recommendations when the component mounts or when selectedProduct changes
  useEffect(() => {
    fetchRecommendations();
  }, [selectedProduct]);

  const fetchRecommendations = async () => {
    try {
      // Make an API request to get recommendations
      const response = await axios.get(
        `http://localhost:5000/recommend/${selectedProduct.shoe_id}`
      );
      setRecommendedProducts(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
      <h2>Recommended Products</h2>
      <ul>
        {recommendedProducts.map((product) => (
          <li key={product.shoe_id}>
            <strong>{product.brand}</strong> - {product.shoe_type} (
            {product.color}, Size {product.size})
            <span>Price: ${product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductRecommendations;*/
import React from "react";
import Shoe from "./Shoe";

const ProductRecommendations = ({ recommendations, addToCart }) => {
  return (
    <div className="recommendations">
      {recommendations.map((product) => (
        <Shoe key={product.shoe_id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductRecommendations;