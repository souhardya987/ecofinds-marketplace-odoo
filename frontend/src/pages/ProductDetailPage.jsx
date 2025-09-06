import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");

    // Ensure `id` matches (convert to Number if needed)
    const found = storedProducts.find((p) => p.id === Number(id));
    if (found) {
      setProduct(found);
    } else {
      alert("Product not found!");
      navigate("/shop");
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // if already exists, increase quantity
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

  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-xl">
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-80 object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <p className="text-xl font-semibold text-emerald-600 mb-6">
              {formatPrice(product.price)}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Listed by: {product.owner || "Unknown"}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
