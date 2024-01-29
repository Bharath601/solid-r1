// App.js
// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Assuming your header is here
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetial';
import blackHoodie from './Images/black.jpg';
import beigeHoodie from './Images/beige.jpg';
import greenHoodie from './Images/green.jpg';
import CustomizeHoodie from './pages/CustomizeHoodie';
import lavendorHoodie from './Images/lavendor.jpg';

const products = [
  // Updated product data with imported images
  { id: 1, name: 'Black Hoodie',  image: blackHoodie, price: '₹1500' },
  { id: 2, name: 'Beige Hoodie',  image: beigeHoodie, price: '₹1500' },
  { id: 3, name: 'Green Hoodie',  image: greenHoodie, price: '₹1500' },
  {id:4 ,name :'lavendor Hoodie',image: lavendorHoodie,price: '₹1500'}
  // Add more products as needed
];
function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load cart items from local storage or a backend service,
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  }, []);

 

  return (
    <Router>
       
      <Header cartCount={cartCount} /> {/* Header should only be called here once */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:productId" element={<ProductDetail products={products} />} />
        <Route path="/customize/:productId" element={<CustomizeHoodie products={products} />} />
        <Route path="/contact" element={<Contact />} />
        {/* ... other routes */}
        
      </Routes>
      
    </Router>
  );
}

export default App;



