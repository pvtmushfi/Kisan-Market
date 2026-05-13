import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { OrderContext } from "../context/OrderContext";

import Button from "../components/Button";
import PaymentButton from "../components/PaymentButton";

function Cart() {

  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    clearCart
  } = useContext(CartContext);

  const { user } = useContext(AuthContext);

  const { addOrder } =
    useContext(OrderContext);

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  // Remove Item
  const removeItem = (id) => {
    removeFromCart(id);
  };

  // Total Amount
  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Checkout
  const handleCheckout = () => {

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const order = {
      id: Date.now(),

      items: cart,

      total: totalAmount,

      paymentMethod,

      status:
        paymentMethod === "cod"
          ? "Pending"
          : "Paid",

      createdAt:
        new Date().toLocaleString()
    };

    addOrder(order);

    clearCart();

    alert(
      paymentMethod === "cod"
        ? "Order placed with Cash on Delivery!"
        : "Payment successful! Order placed."
    );

    navigate("/orders");
  };

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
            onClick={() => navigate("/login")}
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
              onClick={() => navigate("/products")}
            />

          </div>

        ) : (

          <>
            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4"
                >

                  {/* Image */}
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/300x200"
                    }
                    alt={item.name}
                    className="w-full h-48 object-cover rounded"
                  />

                  {/* Info */}
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
                          ₹
                          {item.price * item.quantity}
                        </span>
                      </p>

                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeItem(item.id)
                      }
                      className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                    >
                      Remove Item
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg shadow p-6 mt-10">

              <h2 className="text-2xl font-bold mb-6">
                Payment Summary
              </h2>

              <div className="flex justify-between mb-4">

                <span>Total Products</span>

                <span className="font-semibold">
                  {cart.length}
                </span>

              </div>

              <div className="flex justify-between mb-6">

                <span className="text-xl font-bold">
                  Total Amount
                </span>

                <span className="text-3xl font-bold text-green-600">
                  ₹{totalAmount}
                </span>

              </div>

              {/* Payment Options */}
              <div className="mb-6">

                <h3 className="font-bold mb-3">
                  Select Payment Method
                </h3>

                <div className="flex flex-col md:flex-row gap-4">

                  <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer">

                    <input
                      type="radio"
                      value="cod"
                      checked={
                        paymentMethod === "cod"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                    />

                    Cash on Delivery

                  </label>

                  <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer">

                    <input
                      type="radio"
                      value="online"
                      checked={
                        paymentMethod === "online"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                    />

                    Online Payment

                  </label>

                </div>
              </div>

              {/* Checkout Buttons */}
              {paymentMethod === "online" ? (

                <PaymentButton amount={totalAmount} />

              ) : (

                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  Place Order
                </button>

              )}

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;