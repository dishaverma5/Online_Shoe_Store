import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const ProductPage = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch product details
    fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });

    // Fetch recommendations
    fetch(`${import.meta.env.VITE_API_URL}/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shoe_id: productId }),
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
  }, [productId]);

  return (
    <div>
      <h1>Product Details</h1>
      <ProductDetails
        products={products}
        addToCart={addToCart}
        recommendations={recommendations}
      />
    </div>
  );
};

export default ProductPage;
