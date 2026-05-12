import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://localhost:5000";
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%236b7280'%3EFarm Product%3C/text%3E%3C/svg%3E";

function ProductCard({ product, onAdd, onDelete }) {
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

  const handleDeleteClick = () => {
    if (onDelete) {
      const confirm = window.confirm(
        `Are you sure you want to delete "${product.name}"?`
      );
      if (confirm) {
        onDelete(product.id || product._id);
      }
    }
  };
  // Helper function to get full image URL
  const getImageUrl = () => {
    if (!product.image) {
      return PLACEHOLDER_IMAGE;
    }
    // If image path starts with /, prepend backend URL
    if (product.image.startsWith('/')) {
      return `${API_BASE_URL}${product.image}`;
    }
    // Otherwise return as is
    return product.image;
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

          {onDelete && (
            <button
              onClick={handleDeleteClick}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full font-medium"
            >
              🗑️ Delete Product
            </button>
          )}

          <p className="text-sm text-gray-600 text-center">
            🌾 Farmers manage products
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

          {/* 🔥 REPLACED PAYMENT BUTTON */}
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

      {/* Product Image */}
      <img
        src={getImageUrl()}
        alt={product.name}
        className="h-40 w-full object-cover rounded mb-3"
        onError={(e) => {
          e.target.src = PLACEHOLDER_IMAGE;
        }}
      />

      {/* Name */}
      <h2 className="font-bold text-lg mb-1">
        {product.name}
      </h2>

      {/* Price & Discount */}
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <p className="text-green-600 font-semibold text-lg">
            ₹{product.price}
          </p>
          {product.discount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Stock Status Badge */}
      <div className="mb-3">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            product.available
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.available ? "✓ In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Actions */}
      {renderActionButton()}

      {/* 📦 DETAILS SECTION */}
      {showDetails && user && (
        <div className="mt-4 p-3 bg-gray-50 rounded text-sm space-y-2">

          {/* Product ID */}
          <p>
            <strong>Product ID:</strong>{" "}
            <span className="font-mono text-blue-600">
              {product.productId || product.id}
            </span>
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {product.description || "No description available"}
          </p>

          <p>
            <strong>Quantity Available:</strong>{" "}
            {product.quantity} {product.unit}
          </p>

          <p>
            <strong>Category:</strong>
            <span className="ml-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
              {product.category}
            </span>
          </p>

          <p>
            <strong>Stock Status:</strong>{" "}
            <span
              className={`font-semibold ${
                product.available
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {product.available ? "✓ In Stock" : "✗ Out of Stock"}
            </span>
          </p>

          {product.discount > 0 && (
            <p>
              <strong>Discount Offer:</strong>
              <span className="ml-1 bg-red-100 text-red-700 px-2 py-1 rounded font-bold">
                {product.discount}%
              </span>
            </p>
          )}

          <p>
            <strong>Farmer:</strong> {product.farmerName}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductCard;