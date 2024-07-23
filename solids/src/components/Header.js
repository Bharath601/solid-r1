import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import './Header.css';

const Header = ({ cartCount, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="logo">Hoodies & T-Shirts</div>
      <nav className="navigation">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/shop" className="nav-link">Shop</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>
      <div className="icons">
        <div className="cart" onClick={handleCartClick}>
          <FaShoppingCart className="cart-icon" />
          <span>{cartCount}</span>
        </div>
        <div className="profile" onClick={handleProfileClick}>
          <FaUser className="profile-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
