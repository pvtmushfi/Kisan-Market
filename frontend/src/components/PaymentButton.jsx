import { useContext } from "react";

import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";

function PaymentButton({ amount }) {

  const { cart, clearCart } =
    useContext(CartContext);

  const { addOrder } =
    useContext(OrderContext);

  const handlePayment = () => {

    const options = {

      key: "rzp_test_SnzgBv270hFwYq",

      amount: amount * 100,

      currency: "INR",

      name: "KisanMarket",

      description: "Product Payment",

      handler: function (response) {

        // Create Order
        const order = {
          id: Date.now(),
          items: cart,
          paymentMethod: "Razorpay",
          paymentId: response.razorpay_payment_id,
          status: "Paid",
          createdAt: new Date().toLocaleString()
        };

        // Save Order
        addOrder(order);

        // Clear Cart
        clearCart();

        alert(
          "Payment Successful! Order Placed."
        );
      },

      theme: {
        color: "#16a34a"
      }
    };

    const razorpay =
      new window.Razorpay(options);

    razorpay.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
    >
      Pay with Razorpay
    </button>
  );
}

export default PaymentButton;