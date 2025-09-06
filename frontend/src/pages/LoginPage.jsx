import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as apiLogin } from '../api';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiLogin({ email, password });
      login(data);
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button type="submit" className="w-full py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Need an account? <Link to="/register" className="font-medium text-green-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;