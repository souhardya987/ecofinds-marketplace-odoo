import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api';
import { AuthContext } from '../context/AuthContext';

const AddProductPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userInfo) {
            alert('Please log in to add a product.');
            navigate('/login');
            return;
        }
        try {
            await createProduct({ name, description, price: parseFloat(price), category, imageUrl });
            alert('Product listed successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Failed to create product', error);
            alert('Failed to list product');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">List a New Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" rows="4" required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" step="0.01" required />
                        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    </div>
                    <input type="text" placeholder="Image URL (e.g., https://...)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    <button type="submit" className="w-full py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
                        Add Listing
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;