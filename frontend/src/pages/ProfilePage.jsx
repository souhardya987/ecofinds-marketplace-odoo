import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { List, ShoppingBag, PlusCircle, Trash2 } from "lucide-react";

const ProfilePage = () => {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myListings, setMyListings] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [view, setView] = useState("listings");

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setMyListings(storedProducts.filter((p) => p.owner === userInfo.email));

    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setPurchaseHistory(storedOrders);
  }, [userInfo, navigate]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
      const updated = storedProducts.filter((p) => p.id !== id);
      localStorage.setItem("products", JSON.stringify(updated));
      setMyListings(updated.filter((p) => p.owner === userInfo.email));
    }
  };

  if (!userInfo) return null;

  const TabButton = ({ currentView, viewName, icon: Icon, children }) => (
    <button
      onClick={() => setView(viewName)}
      className={`flex items-center px-4 py-3 text-lg font-medium rounded-t-lg transition-colors ${
        currentView === viewName
          ? "bg-white text-emerald-600 shadow-inner"
          : "bg-transparent text-gray-500 hover:bg-white/50"
      }`}
    >
      <Icon className="mr-3" size={22} /> {children}
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Profile Header */}
      <div className="p-8 mb-8 bg-white rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{userInfo?.name}</h1>
          <p className="text-lg text-gray-500 mt-1">{userInfo?.email}</p>
        </div>
        <Link
          to="/add-product"
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 flex items-center"
        >
          <PlusCircle className="mr-2" /> Add Product
        </Link>
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 p-2 rounded-t-xl flex space-x-2">
        <TabButton currentView={view} viewName="listings" icon={List}>
          My Listings
        </TabButton>
        <TabButton currentView={view} viewName="purchases" icon={ShoppingBag}>
          My Purchases
        </TabButton>
      </div>

      {/* Content */}
      <div className="bg-white p-8 rounded-b-2xl shadow-xl min-h-[300px]">
        {/* My Listings */}
        {view === "listings" &&
          (myListings.length > 0 ? (
            <ul className="space-y-4">
              {myListings.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-800 font-medium">
                    {product.name} –{" "}
                    <span className="font-bold text-emerald-600">
                      {formatPrice(product.price)}
                    </span>
                  </span>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center pt-10">
              You have no active listings.
            </p>
          ))}

        {/* My Purchases */}
        {view === "purchases" &&
          (purchaseHistory.length > 0 ? (
            <ul className="space-y-6">
              {purchaseHistory.map((order) => (
                <li key={order.id} className="p-6 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-baseline mb-4">
                    <p className="font-semibold text-gray-800">
                      Order placed on{" "}
                      <span className="text-emerald-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      Total: {formatPrice(order.totalPrice)}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {order.products.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-16 h-16 object-cover rounded-lg shadow"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{p.name}</p>
                            <p className="text-sm text-gray-500">
                              {formatPrice(p.price)} × {p.quantity || 1}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold text-emerald-600">
                          {formatPrice(p.price * (p.quantity || 1))}
                        </p>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center pt-10">
              You have no purchase history.
            </p>
          ))}
      </div>
    </div>
  );
};

export default ProfilePage;
