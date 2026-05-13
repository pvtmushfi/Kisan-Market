import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

import { AuthContext } from "../context/AuthContext";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "vendor"
  });

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle Role Change
  const handleRoleChange = (role) => {

    setForm({
      ...form,
      role
    });
  };

  // Register User
  const handleSubmit = (e) => {

    e.preventDefault();

    // Validation
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    // Password Match
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Existing Users
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    // Check Existing Email
    const existingUser = users.find(
      (u) => u.email === form.email
    );

    if (existingUser) {
      alert("Email already registered");
      return;
    }

    // Create New User
    const userData = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      profilePic: ""
    };

    // Save User
    users.push(userData);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    console.log("Register:", form);

    alert(
      `Registration successful as ${form.role}!`
    );

    // Save Logged In User
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    // Save Current User
    localStorage.setItem(
      "currentUser",
      JSON.stringify(userData)
    );

    // Login User
    login(userData);

    // Redirect
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-6">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2909/2909762.png"
            alt="logo"
            className="w-20 h-20 mx-auto mb-4"
          />

          <h2 className="text-3xl font-bold text-green-600">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">
            Join KisanMarket today 🌾
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Full Name */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <Input
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Role Selection */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-3">
              I am a:
            </label>

            <div className="flex gap-4">

              {/* Farmer */}
              <button
                type="button"
                onClick={() =>
                  handleRoleChange("farmer")
                }
                className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                  form.role === "farmer"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-300 hover:border-green-400"
                }`}
              >

                🌾 Farmer

                <div className="text-xs mt-1 opacity-75">
                  Sell my products
                </div>

              </button>

              {/* Vendor */}
              <button
                type="button"
                onClick={() =>
                  handleRoleChange("vendor")
                }
                className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                  form.role === "vendor"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-300 hover:border-green-400"
                }`}
              >

                🛒 Vendor

                <div className="text-xs mt-1 opacity-75">
                  Buy from farmers
                </div>

              </button>

            </div>

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <Input
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />

          </div>

          {/* Confirm Password */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <Input
              type="password"
              name="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

          </div>

          {/* Register Button */}
          <Button
            text="Register"
            className="w-full"
          />

        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-6">

          Already have an account?

          <a
            href="/login"
            className="text-green-600 font-bold hover:underline ml-1"
          >
            Login
          </a>

        </p>

      </div>
    </div>
  );
}

export default Register;