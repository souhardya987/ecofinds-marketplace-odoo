import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchMyProducts, fetchMyOrders, deleteProduct } from '../api';

const ProfilePage = () => {
  const { userInfo } = useContext(AuthContext);
  const [myListings, setMyListings] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [view, setView] = useState('listings');

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: listings } = await fetchMyProducts();
        setMyListings(listings);
        const { data: orders } = await fetchMyOrders();
        setPurchaseHistory(orders);
      } catch (error) {
        console.error("Failed to load profile data", error);
      }
    };
    if (userInfo) {
        loadData();
    }
  }, [userInfo]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
        try {
            await deleteProduct(id);
            setMyListings(myListings.filter(p => p.id !== id));
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{userInfo?.name}'s Dashboard</h1>
        <p className="text-gray-600">{userInfo?.email}</p>
      </div>

      <div className="flex border-b mb-6">
        <button onClick={() => setView('listings')} className={`px-4 py-2 ${view === 'listings' ? 'border-b-2 border-green-500' : ''}`}>My Listings</button>
        <button onClick={() => setView('purchases')} className={`px-4 py-2 ${view === 'purchases' ? 'border-b-2 border-green-500' : ''}`}>Purchase History</button>
        <Link to="/add-product" className="ml-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            + Add New Product
        </Link>
      </div>

      {view === 'listings' && (
        <div>
          {myListings.map(product => (
            <div key={product.id} className="flex justify-between items-center p-4 border rounded mb-2">
              <span>{product.name} - ${product.price}</span>
              <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white text-xs px-2 py-1 rounded">Delete</button>
            </div>
          ))}
        </div>
      )}

      {view === 'purchases' && (
        <div>
          {purchaseHistory.map(order => (
            <div key={order.id} className="p-4 border rounded mb-4">
                <p className="font-bold">Order on {new Date(order.createdAt).toLocaleDateString()} - Total: ${order.totalPrice}</p>
                <ul className="list-disc ml-6 mt-2">
                   {order.products.map(p => <li key={p.id}>{p.name} (x{p.quantity}) - ${p.price}</li>)}
                </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;