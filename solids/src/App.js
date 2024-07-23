import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import CustomizeHoodie from './pages/CustomizeHoodie';
import ProductUploadForm from './pages/ProductUploadForm';
import { CheckoutTwo } from './pages/CheckoutTwo';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);

    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Header cartCount={cartCount} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/customize/:productId" element={<CustomizeHoodie />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/upload-product" element={<ProductUploadForm />} />
        <Route path="/checkout" element={<CheckoutTwo />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;
