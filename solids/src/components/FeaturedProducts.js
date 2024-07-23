import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeaturedProducts.css';

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/featured-products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    }

    fetchProducts();
  }, []);

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
    <div className="featured-products">
      <h2 className="section-title">Featured Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-item">
            {product.images && product.images.length > 0 ? (
              <img src={renderImage(product.images[0])} alt={product.name} className="product-image" />
            ) : (
              <p>No Image Available</p>
            )}
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
