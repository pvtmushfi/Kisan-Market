import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function ProductCard({ product, onAdd }) {
  const { user } = useContext(AuthContext);

  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  const handleQuantityChange = (value) => {
    if (value >= 1) setQuantity(value);
  };

  const handleAddWithQuantity = () => {
    onAdd(product, quantity);
    setQuantity(1);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const renderActionButton = () => {
    if (!user) {
      return (
        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2 rounded w-full font-medium"
        >
          Login to Buy
        </button>
      );
    }

    // 🌾 FARMER VIEW
    if (user.role === "farmer") {
      return (
        <div className="mt-2 space-y-2">
          <button
            onClick={toggleDetails}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full font-medium"
          >
            {showDetails ? "Hide Details" : "View Details"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            🌾 Farmer Product Management View
          </p>
        </div>
      );
    }

    // 🛒 VENDOR VIEW
    if (user.role === "vendor") {
      return (
        <div className="mt-2 space-y-3">

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Qty:
            </label>

            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded"
            >
              −
            </button>

            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                handleQuantityChange(parseInt(e.target.value) || 1)
              }
              className="w-12 text-center border border-gray-300 rounded py-1"
              min="1"
            />

            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddWithQuantity}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full font-medium"
          >
            Add to Cart
          </button>

          {/* View Details */}
          <button
            onClick={toggleDetails}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full font-medium"
          >
            View Details
          </button>
        </div>
      );
    }
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg bg-white">

      {/* IMAGE */}
      <img
        src={
          product.image ||
          "https://via.placeholder.com/300x200?text=Kisan+Market"
        }
        alt={product.name}
        className="h-40 w-full object-cover rounded mb-3"
      />

      {/* NAME */}
      <h2 className="font-bold text-lg mb-1">
        {product.name}
      </h2>

      {/* CATEGORY BADGE */}
      <p className="text-xs text-white bg-green-500 inline-block px-2 py-1 rounded mb-2">
        {product.category || "Farm Product"}
      </p>

      {/* PRICE */}
      <p className="text-green-600 font-semibold mb-3">
        ₹{product.price} / {product.unit}
      </p>

      {/* ACTIONS */}
      {renderActionButton()}

      {/* 📦 DETAILS SECTION */}
      {showDetails && user && (
        <div className="mt-4 p-3 bg-gray-50 rounded text-sm space-y-1">

          <p>
            <strong>Description:</strong>{" "}
            {product.description || "No description available"}
          </p>

          <p>
            <strong>Quantity Available:</strong>{" "}
            {product.quantity} {product.unit}
          </p>

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Farmer:</strong> {product.farmerName}
          </p>

          <p>
            <strong>Product ID:</strong> {product.id || product._id}
          </p>

          <p>
            <strong>Added On:</strong>{" "}
            {product.createdAt
              ? new Date(product.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductCard;