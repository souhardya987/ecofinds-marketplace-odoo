import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value);

  const handleRemove = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const total = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    const newOrder = {
      id: Date.now(),
      products: cart,
      totalPrice: total,
      createdAt: new Date().toISOString(),
    };

    const updatedOrders = [...orders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    console.log("✅ Order saved:", newOrder); // Debug log
    alert("Checkout successful! 🎉 Your order has been placed.");

    setCart([]);
    localStorage.removeItem("cart");
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your cart is empty. Start adding some products!
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl shadow-sm"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">{formatPrice(item.price)}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity || 1}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center bg-gray-100 p-6 rounded-2xl shadow-inner mt-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Total: {formatPrice(total)}
            </h2>
            <button
              onClick={handleCheckout}
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
