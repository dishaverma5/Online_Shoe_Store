// components/ProductList.jsx
import React from 'react';
import Product from './Product';

const ProductList = ({ products, addToCart }) => {
    return (
        <div className='row'>
            {products.map(product => (
                <div key={product.id} className="col-md-4 mb-4">
                    <Product product={product} addToCart={addToCart} />
                </div>
            ))}
        </div>
    );
};

export default ProductList;
