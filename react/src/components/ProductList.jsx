import React from 'react';
import Product from './product';

const ProductList = ({ products }) => {
    return(
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
