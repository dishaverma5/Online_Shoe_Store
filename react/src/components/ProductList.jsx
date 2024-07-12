import React from 'react';
import Product from './Product';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className='row'>
      {products.map(product => (
        <div key={product.id} className="col-md-4 mb-4">
          <Product product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
