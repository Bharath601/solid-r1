

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css'; 

function HeroSection() {
  const navigate = useNavigate(); 
 
  const handleShopClick = () => {
    navigate('/shop'); 
  };
  return (
    <div className="hero-section">
      <div className="text-container">
        <h1 className="hero-title">Customisation Products</h1>
       
        <div className="hero-cta">
        <button className="cta-button" onClick={handleShopClick}>
            Shop Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
