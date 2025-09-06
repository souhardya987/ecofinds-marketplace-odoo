import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">
        Welcome to EcoFinds
      </h1>
      <p className="text-lg text-gray-600 mb-12">
        Discover great deals or sell your items with ease. Choose an option to get started.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Link
          to="/shop"
          className="flex flex-col items-center justify-center p-10 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-shadow border border-gray-100"
        >
          <img
            src="https://img.icons8.com/fluency/96/shopping-bag.png"
            alt="Shop"
            className="mb-6"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Shop Products</h2>
          <p className="text-gray-500">Browse listings from people around you.</p>
        </Link>

        <Link
          to="/add-product"
          className="flex flex-col items-center justify-center p-10 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-shadow border border-gray-100"
        >
          <img
            src="https://img.icons8.com/fluency/96/add-shopping-cart.png"
            alt="Sell"
            className="mb-6"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sell an Item</h2>
          <p className="text-gray-500">List your item for sale in just a few clicks.</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
