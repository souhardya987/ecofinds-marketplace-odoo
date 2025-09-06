import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="border-2 border-gray-800 rounded-md p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">Logo</Link>
            <div className="flex items-center space-x-6">
                <Link to="/cart" className="text-xl">Cart</Link>
                <Link to="/profile" className="text-xl">Profile</Link>
            </div>
        </div>
    </header>
  );
};

export default Navbar;