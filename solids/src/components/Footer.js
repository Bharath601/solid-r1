import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center p-4">
      <div className="container mx-auto px-6">
        <p>© {new Date().getFullYear()} Solid Hoodie & T-Shirt Store</p>
        
      </div>
    </footer>
  );
}

export default Footer;
