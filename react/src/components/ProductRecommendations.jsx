import React, { useState, useEffect } from "react";
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
    const response = await axios.post(
      "http://localhost:5000/predict", //endpoint URL according to Flask service
      {
        cart_size: 1, //match Flask service
        cart: [selectedProduct],
      }
    );
    const indices = response.data.recommended_indices; // Assuming the response contains recommended product indices

    // Fetch details for each recommended product
    const detailsRequests = indices.map(
      (index) => axios.get(`http://localhost:3000/shoe/${index}`) // Adjust the URL to your Express server
    );
    const detailsResponses = await Promise.all(detailsRequests);
    const products = detailsResponses.map((res) => res.data);

    setRecommendedProducts(products);
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

export default ProductRecommendations;
