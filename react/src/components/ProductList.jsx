import React, { useState } from 'react';
import Product from './Product';

const ProductList = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Extracting unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div>
      <div className="mb-3">
        <strong>Filter by Category:</strong>
        <div className="btn-group ms-3" role="group" aria-label="Category Filter">
          <button
            type="button"
            className={`btn btn-sm ${selectedCategory === null ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleCategorySelect(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              type="button"
              className={`btn btn-sm ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className='row'>
        {filteredProducts.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
