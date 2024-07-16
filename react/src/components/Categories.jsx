import React from "react";

const Categories = ({ brands = [], colors = [], sizes = [] }) => {
  return (
    <div className="categories">
      <div className="category-section">
        <h3>Brand</h3>
        <ul>
          {brands.map((brand, index) => (
            <li key={index}>{brand}</li>
          ))}
        </ul>
      </div>
      <div className="category-section">
        <h3>Color</h3>
        <ul>
          {colors.map((color, index) => (
            <li key={index}>{color}</li>
          ))}
        </ul>
      </div>
      <div className="category-section">
        <h3>Size</h3>
        <ul>
          {sizes.map((size, index) => (
            <li key={index}>{size}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
