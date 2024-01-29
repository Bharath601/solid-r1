

import React from 'react';
import './FeaturedProducts.css'; 

function FeaturedProducts() {
  return (
    <div className="featured-products">
      <h2 className="text-5xl text-white font-bold mb-4">Featured Products</h2>
      <div className="product-grid">
        
        <div className="product-item">Product 1</div>
        <div className="product-item">Product 2</div>
        <div className="product-item">Product 3</div>
        
      </div>
    </div>
  );
}

export default FeaturedProducts;


