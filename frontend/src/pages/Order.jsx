import { useContext } from "react";

import { OrderContext } from "../context/OrderContext";

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23e5e7eb'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%236b7280'%3EFarm%3C/text%3E%3C/svg%3E";

function Orders() {

  const { orders } =
    useContext(OrderContext);

  return (

    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-10 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold">
            📦 My Orders
          </h1>

          <p className="mt-2 text-green-100">
            Track all your purchased products
          </p>

        </div>

      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">

        {orders.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="empty"
              className="w-32 mx-auto mb-5"
            />

            <h2 className="text-2xl font-bold text-gray-700">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Your placed orders will appear here.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {orders
              .slice()
              .reverse()
              .map((order) => (

                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >

                  {/* Top */}
                  <div className="bg-green-600 text-white p-5 flex justify-between items-center">

                    <div>

                      <h2 className="text-lg font-bold">
                        Order #{order.id}
                      </h2>

                      <p className="text-sm text-green-100 mt-1">
                        {order.createdAt}
                      </p>

                    </div>

                    <div
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        order.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </div>

                  </div>

                  {/* Payment */}
                  <div className="p-5 border-b">

                    <div className="flex justify-between items-center">

                      <span className="font-medium text-gray-600">
                        Payment Method
                      </span>

                      <span className="font-bold text-gray-800">
                        {order.paymentMethod}
                      </span>

                    </div>

                  </div>

                  {/* Products */}
                  <div className="p-5 space-y-4">

                    {order.items.map((item) => (

                      <div
                        key={item.id}
                        className="flex gap-4 border rounded-xl p-3 hover:shadow-md transition"
                      >

                        {/* Product Image */}
                        <img
                          src={item.image || PLACEHOLDER_IMAGE}
                          alt={item.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />

                        {/* Info */}
                        <div className="flex-1">

                          <h3 className="text-lg font-bold text-gray-800">
                            {item.name}
                          </h3>

                          <p className="text-gray-500 text-sm mt-1">
                            {item.category}
                          </p>

                          <div className="flex justify-between items-center mt-3">

                            <p className="text-green-600 font-bold text-lg">
                              ₹{item.price}
                            </p>

                            <p className="text-sm text-gray-600">
                              Qty:
                              <span className="font-semibold ml-1">
                                {item.quantity}
                              </span>
                            </p>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                  {/* Footer */}
                  <div className="bg-gray-50 px-5 py-4 flex justify-between items-center">

                    <span className="font-semibold text-gray-700">
                      Total Items:
                      <span className="ml-2 text-black">
                        {order.items.length}
                      </span>
                    </span>

                    <span className="text-2xl font-bold text-green-600">

                      ₹
                      {order.items.reduce(
                        (total, item) =>
                          total +
                          item.price * item.quantity,
                        0
                      )}

                    </span>

                  </div>

                </div>

              ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default Orders;