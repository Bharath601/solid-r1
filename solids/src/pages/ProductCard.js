import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const renderImage = (image) => {
    if (!image || !image.data || !image.data.data) return null;
    
    // Convert binary data to base64 string
    let binary = '';
    const bytes = new Uint8Array(image.data.data);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64String = window.btoa(binary);

    return `data:${image.contentType};base64,${base64String}`;
  };

  return (
    <div className="product-card max-w-sm rounded overflow-hidden shadow-lg p-4">
      <Link to={`/products/${product._id}`} className="product-card-link no-underline">
        <div className="product-image-container h-48 flex items-center justify-center bg-gray-200">
          {product.images && product.images.length > 0 ? (
            <img src={renderImage(product.images[0])} alt={product.name} className="product-image max-h-full" />
          ) : (
            <p className="text-gray-500">No Image Available</p>
          )}
        </div>
        <div className="product-info mt-4">
          <h3 className="product-name text-xl font-bold">{product.name}</h3>
          <p className="product-description text-gray-700">{product.description}</p>
          <p className="product-price text-lg font-semibold">{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
