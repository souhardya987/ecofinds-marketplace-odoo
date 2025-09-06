import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const productId = product.id || product._id; 

  return (
    <div className="border-2 border-gray-800 rounded-md p-2">
      <Link to={`/product/${productId}`}>
        <div className="border-2 border-gray-800 rounded-md h-40 bg-gray-100 mb-2 flex items-center justify-center">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="max-h-full max-w-full"
            />
        </div>
        <h3 className="font-bold truncate">{product.name}</h3>
        <p className="text-gray-600">${parseFloat(product.price).toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default ProductCard;