import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css'; 



function ProductDetail({ products}) {
  let { productId } = useParams();
  const navigate = useNavigate();
 
  const product = products.find(p => p.id.toString() === productId);
  const handleContactClick = () => {
    window.open('https://linktr.ee/bharath601', '_blank');
  };

  
  const handleCustomize = () => {
    navigate(`/customize/${product.id}`); 
  };
  
  if (!product) {
    return <div>Product not found!</div>;
  }
return (

  <div className="product-detail-container">
    <div className="product-images">
      <img src={product.image} alt={product.name} className="product-preview" />
    </div>
    <div className="product-detail-info">
      <h1 className="product-title">{product.name}</h1>
      <p className="product-price">{product.price}</p>
      <button className="customize-btn" onClick={handleCustomize}>
        Customize
      </button>
      
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
 <button onClick={handleContactClick} className="add-to-cart-btn" >
Buy 
</button>

<div className="product-description">
  <p>A comfortable and stylish hoodie. Perfect for casual wear or for layering during colder months. Features a front pouch pocket and a drawstring hood.</p>
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