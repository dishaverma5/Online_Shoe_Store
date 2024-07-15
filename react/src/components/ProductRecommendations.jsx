import React, { useState } from "react";
import axios from "axios"; // Import Axios (you can install it using npm or yarn)

const ProductRecommendations = ({ selectedProduct }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const fetchRecommendations = async () => {
    try {
      // Make an API request to get recommendations
      const response = await axios.get("/api/recommendations"); // Adjust the endpoint URL
      const data = response.data; // Assuming the response contains recommended products

      // Update the state with the received recommendations
      setRecommendedProducts(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Call fetchRecommendations when needed (e.g., on button click)
  // ...

  return <div>{/* Render recommended products here */}</div>;
};

export default ProductRecommendations;
