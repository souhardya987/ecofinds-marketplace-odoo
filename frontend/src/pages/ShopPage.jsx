import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShopPage = () => {
  const [products, setProducts] = useState([]);

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value);

  useEffect(() => {
    let storedProducts = localStorage.getItem("products");

    // If nothing is stored yet → seed starter products
    if (!storedProducts) {
      const starterProducts = [
        {
          id: 1,
          name: "Wireless Earbuds",
          description: "High-quality sound with noise cancellation and long battery life.",
          price: 1999,
          category: "Electronics",
          imageUrl: "https://images.unsplash.com/photo-1585386959984-a41552262a0d",
          owner: "demo@ecofinds.com",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Yoga Mat",
          description: "Eco-friendly, non-slip yoga mat for your daily fitness routine.",
          price: 899,
          category: "Fitness",
          imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
          owner: "demo@ecofinds.com",
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: "Coffee Mug",
          description: "Ceramic coffee mug with a minimalist design and matte finish.",
          price: 299,
          category: "Kitchen",
          imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
          owner: "demo@ecofinds.com",
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem("products", JSON.stringify(starterProducts));
      setProducts(starterProducts);
    } else {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = existingCart.find((item) => item.id === product.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Shop Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-60 object-cover"
                />
              </Link>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-emerald-600 mb-4">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/product/${product.id}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
