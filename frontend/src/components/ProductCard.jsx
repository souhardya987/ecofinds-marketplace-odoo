import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const productId = product.id || product._id;

  return (
    <div className="card group">
      <Link to={`/product/${productId}`}>
        <div className="overflow-hidden relative">
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-900 truncate">{product.name}</h3>
          <p className="text-2xl font-extrabold text-emerald-600 mt-2">${parseFloat(product.price).toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;