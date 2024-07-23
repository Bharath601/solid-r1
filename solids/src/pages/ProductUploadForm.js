import React, { useState } from 'react';
import axios from 'axios';
import './ProductUploadForm.css';

const ProductUploadForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    images: [],
    price: '',
    status: 'Available',
    type: 't-shirt', // Default type
    highlight: 'null' // Default highlight
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData({ ...productData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('status', productData.status);
      formData.append('type', productData.type);
      formData.append('highlight', productData.highlight);
      productData.images.forEach(image => formData.append('images', image));

      const response = await axios.post('http://localhost:3000/api/productsUp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product uploaded successfully:', response.data);
      // Reset the form
      setProductData({
        name: '',
        description: '',
        images: [],
        price: '',
        status: 'Available',
        type: 't-shirt',
        highlight: 'null'
      });
    } catch (error) {
      console.error('Error uploading product:', error.response || error.message); // Log the error response
    }
  };

  return (
    <form className="product-upload-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={productData.name} onChange={handleInputChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={productData.description} onChange={handleInputChange} required />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={productData.price} onChange={handleInputChange} required />
      </label>
      <label>
        Status:
        <select name="status" value={productData.status} onChange={handleInputChange}>
          <option value="Available">Available</option>
          <option value="Sold Out">Sold Out</option>
        </select>
      </label>
      <label>
        Type:
        <select name="type" value={productData.type} onChange={handleInputChange}>
          <option value="t-shirt">T-Shirt</option>
          <option value="hoodie">Hoodie</option>
        </select>
      </label>
      <label>
        Highlight:
        <select name="highlight" value={productData.highlight} onChange={handleInputChange}>
          <option value="null">None</option>
          <option value="featured">Featured</option>
          <option value="highlight">Highlight</option>
        </select>
      </label>
      <label>
        Images:
        <input type="file" multiple onChange={handleImageChange} />
      </label>
      <button type="submit">Upload Product</button>
    </form>
  );
};

export default ProductUploadForm;
