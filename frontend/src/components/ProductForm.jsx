import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { addProduct } from "../services/productService";
import toast from "react-hot-toast";

const ProductForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    unit: "kg",
    category: "Fruits",
    available: true,
    discount: 0,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.price ||
      !formData.description ||
      !formData.quantity ||
      !formData.image
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const data = new FormData();

    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("quantity", formData.quantity);
    data.append("unit", formData.unit);
    data.append("category", formData.category);
    data.append("available", formData.available);
    data.append("discount", formData.discount);
    data.append("image", formData.image);
    // Add farmer info
    data.append("farmerId", user?.id || user?._id);
    data.append("farmerName", user?.name || "Unknown Farmer");

    try {
      const res = await addProduct(data);

      toast.success(res.message || "Product added successfully!");

      setFormData({
        name: "",
        price: "",
        description: "",
        quantity: "",
        unit: "kg",
        category: "Fruits",
        available: true,
        discount: 0,
        image: null,
      });

      setPreview("");

      // Redirect to products page to see the newly added product
      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add product");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-green-700">
        Add Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹) *
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Quantity & Unit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="kg">Kilogram (kg)</option>
              <option value="g">Gram (g)</option>
              <option value="lbs">Pounds (lbs)</option>
              <option value="pieces">Pieces</option>
              <option value="dozen">Dozen</option>
              <option value="liter">Liter (L)</option>
              <option value="ml">Milliliter (ml)</option>
            </select>
          </div>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Grains">Grains</option>
            <option value="Seeds">Seeds</option>
            <option value="Dairy">Dairy</option>
          </select>
        </div>

        {/* Discount Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount (%)
          </label>
          <input
            type="number"
            name="discount"
            placeholder="Enter discount percentage"
            value={formData.discount}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.01"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Stock Availability Toggle */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500 cursor-pointer"
          />
          <label
            htmlFor="available"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            In Stock
          </label>
          <span className="ml-auto text-sm font-semibold text-green-600">
            {formData.available ? "Available" : "Out of Stock"}
          </span>
        </div>

        {/* Product Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: JPEG, JPG, PNG, WebP
          </p>
        </div>

        {preview && (
          <div className="flex flex-col items-center">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Image Preview
            </p>
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg border-2 border-green-500"
            />
          </div>
        )}

        {/* Auto-Generated Product ID Info */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Product ID will be auto-generated upon
            creation
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;