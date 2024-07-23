import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Shop.css';

function Shop() {
  const [allProducts, setAllProducts] = useState([]);
  const [tshirts, setTshirts] = useState([]);
  const [hoodies, setHoodies] = useState([]);
  const [currentTab, setCurrentTab] = useState('all');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        const products = response.data;
        setAllProducts(products);
        setTshirts(products.filter(product => product.type === 't-shirt'));
        setHoodies(products.filter(product => product.type === 'hoodie'));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const renderProducts = (products) => (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );

  return (
    <div className="shop-page">
      <nav className="shop-nav">
        <a
          href="#"
          className={`shop-nav-item ${currentTab === 'all' ? 'active' : ''}`}
          onClick={() => setCurrentTab('all')}
        >
          All Products
        </a>
        <a
          href="#"
          className={`shop-nav-item ${currentTab === 't-shirts' ? 'active' : ''}`}
          onClick={() => setCurrentTab('t-shirts')}
        >
          T-Shirts
        </a>
        <a
          href="#"
          className={`shop-nav-item ${currentTab === 'hoodies' ? 'active' : ''}`}
          onClick={() => setCurrentTab('hoodies')}
        >
          Hoodies
        </a>
      </nav>

      {currentTab === 'all' && (
        <section id="all-products">
          <h1 className="shop-title">All Products</h1>
          {renderProducts(allProducts)}
        </section>
      )}
      {currentTab === 't-shirts' && (
        <section id="t-shirts">
          <h1 className="shop-title">T-Shirts</h1>
          {renderProducts(tshirts)}
        </section>
      )}
      {currentTab === 'hoodies' && (
        <section id="hoodies">
          <h1 className="shop-title">Hoodies</h1>
          {renderProducts(hoodies)}
        </section>
      )}
    </div>
  );
}

export default Shop;
