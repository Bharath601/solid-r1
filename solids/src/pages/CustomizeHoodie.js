import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CustomizeHoodie.css';

function CustomizeHoodie() {
  let { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [customImage, setCustomImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      async function fetchProduct() {
        try {
          const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
      fetchProduct();
    }
  }, [navigate, productId]);

  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setCustomImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContactClick = () => {
    window.open('https://linktr.ee/bharath601', '_blank');
  };

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="customize-container">
      <div className="hoodie-customize-image-container">
        <img src={product.image} alt={product.name} className="hoodie-image" />
        {customImage && (
          <img src={customImage} alt="Custom design" className="custom-design-preview" />
        )}
      </div>
      <div className="customization-controls">
        <label htmlFor="upload-design">Upload Your Design:</label>
        <input type="file" id="upload-design" onChange={handleImageUpload} />
        <button onClick={handleContactClick} className="contact-customization-btn">
          Contact for Customisation
        </button>
        <div>
          <button onClick={() => navigate('/shop')}>Back to Shop</button>
        </div>
      </div>
    </div>
  );
}

export default CustomizeHoodie;
