import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail() {
  let { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    fetchProduct();
  }, [productId]);

  const handleCustomize = () => {
    navigate(`/customize/${productId}`);
  };

  const handleBuyClick = () => {
    if (isAuthenticated) {
      navigate('/checkout', { state: { product } });
    } else {
      navigate('/login');
    }
  };

  const renderImage = (image) => {
    if (!image || !image.data || !image.data.data) return null;

    let binary = '';
    const bytes = new Uint8Array(image.data.data);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64String = window.btoa(binary);

    return `data:${image.contentType};base64,${base64String}`;
  };

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-images">
        {product.images && product.images.length > 0 ? (
          <img src={renderImage(product.images[0])} alt={product.name} className="product-preview" />
        ) : (
          <p>No Image Available</p>
        )}
      </div>
      <div className="product-detail-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">{product.price}</p>
        <button className="customize-btn" onClick={handleCustomize}>Customize</button>
        <div className="size-selector">
          <label htmlFor="size">Size</label>
          <select name="size" id="size">
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
          </select>
        </div>
        <button onClick={handleBuyClick} className="add-to-cart-btn">Buy</button>
        <button onClick={() => navigate('/cart')} className="view-cart-btn">Cart</button>
        <div className="product-description">
          <p>{product.description}</p>
          <ul>
            <li>Soft, heavyweight fleece</li>
            <li>Adjustable drawstring hood</li>
            <li>Ribbed cuffs and waistband</li>
            <li>Machine washable</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
