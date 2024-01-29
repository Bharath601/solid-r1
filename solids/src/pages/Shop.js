// Shop.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './ProductDetial'; // Import the product detail component
import './Shop.css'; // Make sure to import the CSS file for Shop page

import ProductCard from './ProductCard';
import blackHoodie from '../Images/black.jpg';
import beigeHoodie from '../Images/beige.jpg';
import greenHoodie from '../Images/green.jpg';
import lavendorHoodie from '../Images/lavendor.jpg';

const products = [
  // Updated product data with imported images
  { id: 1, name: 'Black Hoodie', image: blackHoodie, price: '₹1500' },
  { id: 2, name: 'Beige Hoodie', image: beigeHoodie, price: '₹1500' },
  { id: 3, name: 'Green Hoodie', image: greenHoodie, price: '₹1500' },
  { id:4 ,name :'lavendor Hoodie',image: lavendorHoodie, price: '₹1500'}
];

function Shop() {
  return (
    <div className="shop-page">
      <h1 className="shop-title">Hoodies</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    
  );
}

export default Shop;

