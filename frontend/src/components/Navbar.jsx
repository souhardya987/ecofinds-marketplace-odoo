import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, User, LogIn, LogOut } from 'lucide-react';

const Navbar = () => {
  const auth = useContext(AuthContext);
  const userInfo = auth?.userInfo;
  const logout = auth?.logout;
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-emerald-600">
          EcoFinds
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/cart" className="text-gray-600 hover:text-emerald-600 transition-colors relative">
            <ShoppingCart size={24} />
          </Link>
          {userInfo ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors">
                <User size={24} className="mr-2" />
                <span className="font-medium hidden sm:block">{userInfo.name}</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                <LogOut size={24} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 text-sm">
              <LogIn size={20} className="mr-2" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
