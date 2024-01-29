

import React from 'react';
import './CustomizationHighlight.css'; 

function CustomizationHighlight() {
  return (
    <div className="customization-highlight">
      <h2 className="text-5xl font-bold mb-4">Customize Your Own</h2>
      <p className="mb-8">Create a hoodie or t-shirt that's uniquely yours</p>
      <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
        Start Customizing
      </button>
    </div>
  );
}

export default CustomizationHighlight;

