import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInfo) {
      alert('Please log in to add a product.');
      navigate('/login');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      description,
      price: parseFloat(price),
      category,
      imageUrl,
      owner: userInfo.email,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('products') || '[]');
    localStorage.setItem('products', JSON.stringify([...existing, newProduct]));

    alert('Product listed successfully!');
    navigate('/profile');
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">List a New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-3 px-4 bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full py-3 px-4 bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            rows="5"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="number"
              placeholder="Price (₹)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full py-3 px-4 bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              step="0.01"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full py-3 px-4 bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Image URL (e.g., https://...)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full py-3 px-4 bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 text-lg rounded-xl font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Add Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
