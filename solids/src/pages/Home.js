
import React from 'react';

import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import CustomizationHighlight from '../components/CustomizationHighlight';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';



function Home() {
  return (
    <div>
          
         
      <HeroSection />
      <FeaturedProducts />
      
      <AboutUs />
      <Footer />
      
    </div>
  );
}

export default Home;
