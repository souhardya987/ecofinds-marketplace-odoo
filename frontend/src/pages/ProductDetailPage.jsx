import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    loadProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productId = product.id || product._id;
    const existingItem = cart.find(item => (item.id || item._id) === productId);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  if (!product) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto border-2 border-gray-800 rounded-md p-4 grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="border-2 border-gray-800 rounded-md h-80 flex items-center justify-center">
            <img src={product.imageUrl} alt={product.name} className="max-h-full max-w-full" />
        </div>
        <div className="flex justify-center space-x-2">
            <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-xl mt-2">${parseFloat(product.price).toFixed(2)}</p>
        <div className="border-2 border-gray-800 rounded-md p-4 mt-4 flex-grow">
            <h2 className="font-bold">Product Description</h2>
            <p className="mt-2">{product.description}</p>
            <p className="mt-4 text-sm">Seller: {product.user?.name}</p>
        </div>
        <button onClick={addToCart} className="w-full mt-4 p-2 border-2 border-gray-800 rounded-md bg-gray-200 hover:bg-gray-300">
          Add To Cart Button
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;