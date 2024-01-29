
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
  const [isExploreDropdownVisible, setExploreDropdownVisible] = useState(false);
  

  

  return (
    <header className="header">
      <div className="navigation">
        <div className="dropdown">
          <button onClick={() => setExploreDropdownVisible(prev => !prev)} className="dropbtn">
            EXPLORE
          </button>
          {isExploreDropdownVisible && (
            <div className="dropdown-content">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/shop" className="nav-link">Shop</Link>
             
              <a href="https://linktr.ee/bharath601" className="nav-link" target="_blank" rel="noopener noreferrer">
                Contact
              </a>
            </div>
          )}
        </div>
      </div>
      
    </header>
  );
}

export default Header;
