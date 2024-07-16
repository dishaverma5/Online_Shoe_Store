import React, { useEffect, useState } from "react";
import Shoe from "./Shoe";

const groupByCategory = (data, category) => {
  return data.reduce((acc, item) => {
    const key = item.shoeDetails[category];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
};

const CategorySection = ({ category, products }) => (
  <div>
    <h3>{category}</h3>
    <div className="row">
      {products.map((product) => (
        <Shoe key={product.shoe_id} product={product} />
      ))}
    </div>
  </div>
);

const Home = ({ data, addToCart }) => {
  const [categories, setCategories] = useState({ brands: [], colors: [], sizes: [] });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        if (!response.ok) {
          throw new Error("Categories could not be fetched!");
        }
        const json_response = await response.json();
        setCategories(json_response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const brands = groupByCategory(data, "brand");
  const colors = groupByCategory(data, "color");
  const sizes = groupByCategory(data, "size");

  return (
    <div>
      <h2>By Brand</h2>
      {categories.brands.map((brand) => (
        <CategorySection key={brand} category={brand} products={brands[brand] || []} />
      ))}
      
      <h2>By Color</h2>
      {categories.colors.map((color) => (
        <CategorySection key={color} category={color} products={colors[color] || []} />
      ))}
      
      <h2>By Size</h2>
      {categories.sizes.map((size) => (
        <CategorySection key={size} category={size} products={sizes[size] || []} />
      ))}
    </div>
  );
};

export default Home;
