import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0).toFixed(2);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    try {
        const orderData = {
            orderItems: cartItems.map(item => ({ ...item, _id: (item.id || item._id) })),
            totalPrice: totalPrice,
        };
        await createOrder(orderData);
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        navigate('/profile');
    } catch (error) {
        alert('Checkout failed. Please make sure you are logged in.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto border-2 border-gray-800 rounded-md p-6 mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Cart Page</h1>
        <div className="space-y-4">
            {cartItems.length > 0 ? (
                cartItems.map(item => (
                    <div key={item.id || item._id} className="border-2 border-gray-800 rounded-md p-4">
                        <p>{item.name} - ${parseFloat(item.price).toFixed(2)} x {item.qty}</p>
                    </div>
                ))
            ) : (
                <div className="border-2 border-gray-800 rounded-md p-4 text-center">Your cart is empty.</div>
            )}
        </div>
        <div className="mt-6">
            <p className="text-lg text-right">Total price for {cartItems.length} items: ${totalPrice}</p>
        </div>
        <div className="mt-4">
            <button onClick={handleCheckout} className="w-full p-2 border-2 border-gray-800 rounded-md bg-gray-200 hover:bg-gray-300">
                Checkout
            </button>
        </div>
    </div>
  );
};

export default CartPage;