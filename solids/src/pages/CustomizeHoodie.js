
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CustomizeHoodie.css'; 

function CustomizeHoodie({ products }) {
  let { productId } = useParams();
  const navigate = useNavigate();
  const [customImage, setCustomImage] = useState(null);
  const product = products.find(p => p.id.toString() === productId);
  const handleContactClick = () => {
    window.open('https://linktr.ee/bharath601', '_blank');
  };

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
        <div><button onClick={() => navigate('/shop')}>Back to Shop</button></div>
        
      </div>
      </div>
     
      
    </div>
  );
}

export default CustomizeHoodie;

