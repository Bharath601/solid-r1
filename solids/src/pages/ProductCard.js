

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './ProductCard.css'; 

function ProductCard({ product  }) {
  const navigate = useNavigate(); 

  

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price-container">
            <span className="product-price">{product.price}</span>
          </div>
        </div>
      </Link>
      
    </div>
  );
}

export default ProductCard;