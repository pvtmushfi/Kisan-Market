import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { OrderContext } from "../context/OrderContext";

import Button from "../components/Button";
import PaymentButton from "../components/PaymentButton";

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%236b7280'%3EFarm Product%3C/text%3E%3C/svg%3E";

function Cart() {
  const navigate = useNavigate();

  const { cart = [], removeFromCart, clearCart } =
    useContext(CartContext);

  const { user } = useContext(AuthContext);
  const { addOrder } = useContext(OrderContext);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // REMOVE ITEM
  const handleRemove = (id) => {
    removeFromCart(id);
  };

  // TOTAL
  const totalAmount = cart.reduce((sum, item) => {
    return sum + (Number(item.price) || 0) * (item.quantity || 1);
  }, 0);

  // CHECKOUT (IMPORTANT FIXED STRUCTURE)
  const handleCheckout = () => {
    if (!cart.length) {
      alert("Cart is empty");
      return;
    }

    // Group by farmer (IMPORTANT FOR MARKETPLACE)
    const farmerId = cart[0]?.farmerId || null;

    const order = {
      id: Date.now(),

      buyerId: user?.id,
      buyerName: user?.name,

      farmerId: farmerId,

      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image
      })),

      total: totalAmount,

      paymentMethod,
      status: paymentMethod === "cod" ? "Pending" : "Paid",

      createdAt: new Date().toISOString(),
    };

    addOrder(order);

    // CLEAR CART SAFELY
    clearCart();

    alert("Order placed successfully!");

    navigate("/orders");
  };

  // NOT LOGGED IN
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-3">
            Please login to continue
          </h2>

          <Button text="Login" onClick={() => navigate("/login")} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-green-600 text-white p-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="opacity-90">Review your items before checkout</p>
      </div>

      <div className="max-w-6xl mx-auto p-6">

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <div className="bg-white p-8 rounded shadow text-center">
            <h2 className="text-xl font-bold mb-4">
              Cart is empty
            </h2>

            <Button
              text="Browse Products"
              onClick={() => navigate("/products")}
            />
          </div>
        ) : (
          <>

            {/* ITEMS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded shadow"
                >

                  <img
                    src={item.image || PLACEHOLDER_IMAGE}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded"
                  />

                  <h2 className="text-lg font-bold mt-2">
                    {item.name}
                  </h2>

                  <p className="text-green-600 font-semibold">
                    ₹{item.price}
                  </p>

                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity || 1}
                  </p>

                  <p className="font-bold mt-1">
                    Total: ₹{(item.price || 0) * (item.quantity || 1)}
                  </p>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="w-full mt-3 bg-red-500 text-white py-2 rounded"
                  >
                    Remove
                  </button>

                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="bg-white mt-10 p-6 rounded shadow">

              <h2 className="text-2xl font-bold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between mb-2">
                <span>Total Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span className="font-bold text-lg">
                  Total Amount
                </span>
                <span className="text-green-600 font-bold text-xl">
                  ₹{totalAmount}
                </span>
              </div>

              {/* PAYMENT METHOD */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">
                  Payment Method
                </h3>

                <div className="flex gap-4">

                  <label>
                    <input
                      type="radio"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                    />
                    <span className="ml-2">COD</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                    />
                    <span className="ml-2">Online</span>
                  </label>

                </div>
              </div>

              {/* CHECKOUT */}
              {paymentMethod === "online" ? (
                <PaymentButton amount={totalAmount} />
              ) : (
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 text-white py-3 rounded font-semibold"
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