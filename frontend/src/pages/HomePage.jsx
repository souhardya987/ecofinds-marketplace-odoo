import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await fetchProducts(search);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]); 
      }
    };
    loadProducts();
  }, [search]);

  return (
    <div className="container mx-auto space-y-8">
      <div className="border-2 border-gray-800 rounded-md h-48 flex items-center justify-center">
        <p className="text-2xl">Banner Image</p>
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border-2 border-gray-800 rounded-md flex-grow"
        />
        <button className="p-2 border-2 border-gray-800 rounded-md bg-gray-200">Sort</button>
        <button className="p-2 border-2 border-gray-800 rounded-md bg-gray-200">Filter</button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">All categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border-2 border-gray-800 rounded-md h-24 flex items-center justify-center"><p>Category 1</p></div>
          <div className="border-2 border-gray-800 rounded-md h-24 flex items-center justify-center"><p>Category 2</p></div>
          <div className="border-2 border-gray-800 rounded-md h-24 flex items-center justify-center"><p>Category 3</p></div>
          <div className="border-2 border-gray-800 rounded-md h-24 flex items-center justify-center"><p>Category 4</p></div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id || product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;