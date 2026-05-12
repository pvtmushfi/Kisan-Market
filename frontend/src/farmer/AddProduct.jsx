import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { addProduct } from "../services/productService";

function AddProduct() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    unit: "kg",
    category: "Fruits",
    discount: 0,
    available: true,
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.quantity || !form.description || !form.image) {
      alert("Please fill all required fields");
      return;
    }
    const authToken = token || localStorage.getItem("token");
    if (!authToken) {
      alert("Session expired or token missing. Please logout and login again.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", parseFloat(form.price));
      formData.append("quantity", parseFloat(form.quantity));
      formData.append("unit", form.unit);
      formData.append("category", form.category);
      formData.append("discount", parseFloat(form.discount) || 0);
      formData.append("available", form.available);
      formData.append("image", form.image);
      // Add farmer info
      formData.append("farmerId", user?.id || user?._id);
      formData.append("farmerName", user?.name || "Unknown Farmer");

      await addProduct(formData);
      alert("Product added successfully!");
      setForm({
        name: "",
        price: "",
        description: "",
        quantity: "",
        unit: "kg",
        category: "Fruits",
        discount: 0,
        available: true,
        image: null,
      });
      setPreview("");
      // Redirect to My Products page to see the newly added product
      setTimeout(() => {
        navigate("/farmer/myproducts");
      }, 1500);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-8 px-6">
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <Input
                name="name"
                placeholder="Enter product name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* Price & Discount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <Input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount (%)
                </label>
                <Input
                  type="number"
                  name="discount"
                  placeholder="Enter discount %"
                  value={form.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
            </div>

            {/* Quantity & Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <Input
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 w-full rounded focus:ring-2 focus:ring-green-600 focus:border-transparent"
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

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border border-gray-300 p-3 w-full rounded focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Grains">Grains</option>
                <option value="Seeds">Seeds</option>
                <option value="Dairy">Dairy</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                placeholder="Enter product description"
                value={form.description}
                onChange={handleChange}
                className="border border-gray-300 p-3 w-full rounded focus:ring-2 focus:ring-green-600 focus:border-transparent"
                rows="4"
              />
            </div>

            {/* Stock Availability */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={form.available}
                onChange={handleChange}
                className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500 cursor-pointer"
              />
              <label htmlFor="available" className="text-sm font-medium text-gray-700 cursor-pointer">
                In Stock
              </label>
              <span className="ml-auto text-sm font-semibold text-green-600">
                {form.available ? "✓ Available" : "✗ Out of Stock"}
              </span>
            </div>

            {/* Product Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border border-gray-300 p-3 w-full rounded focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: JPEG, JPG, PNG, WebP (Max size: 5MB)
              </p>
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium text-gray-700 mb-2">Image Preview</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg border-2 border-green-500"
                />
              </div>
            )}

            {/* Auto Product ID Info */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Product ID will be auto-generated upon creation
              </p>
            </div>

            <Button
              text={loading ? "Adding..." : "Add Product"}
              className="w-full"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;