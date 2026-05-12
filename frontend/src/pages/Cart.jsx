import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

import Button from "../components/Button";
import PaymentButton from "../components/PaymentButton";

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%236b7280'%3EFarm Product%3C/text%3E%3C/svg%3E";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  // Remove Product
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Total Amount
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Not Logged In
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please Login
          </h2>

          <Button
            text="Login"
            onClick={() => (window.location.href = "/login")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-green-600 text-white py-8 px-6">
        <h1 className="text-3xl font-bold">
          Your Cart
        </h1>

        <p className="mt-2 text-green-100">
          Review your products before payment
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="bg-white p-10 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold mb-4">
              Your cart is empty
            </h2>

            <Button
              text="Shop Products"
              onClick={() => (window.location.href = "/products")}
            />
          </div>
        ) : (
          <>
            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4"
                >

                  {/* Product Image */}
                  <img
                    src={item.image || PLACEHOLDER_IMAGE}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded"
                  />

                  {/* Product Info */}
                  <div className="mt-4">

                    <h2 className="text-xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {item.category}
                    </p>

                    <p className="text-green-600 text-2xl font-bold mt-3">
                      ₹{item.price}
                    </p>

                    <div className="mt-2">
                      <p>
                        Quantity:
                        <span className="font-semibold ml-2">
                          {item.quantity}
                        </span>
                      </p>

                      <p className="mt-1">
                        Total:
                        <span className="font-bold text-green-700 ml-2">
                          ₹{item.price * item.quantity}
                        </span>
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                    >
                      Remove Item
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-lg shadow p-6 mt-10">

              <h2 className="text-2xl font-bold mb-6">
                Payment Summary
              </h2>

              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">
                  Total Products
                </span>

                <span className="font-semibold">
                  {cart.length}
                </span>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold">
                  Total Amount
                </span>

                <span className="text-3xl font-bold text-green-600">
                  ₹{totalAmount}
                </span>
              </div>

              {/* Razorpay Payment */}
              <PaymentButton amount={totalAmount} />

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;