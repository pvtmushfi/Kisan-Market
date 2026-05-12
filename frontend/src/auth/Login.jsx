import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

import { AuthContext } from "../context/AuthContext";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const { login } =
    useContext(AuthContext);

  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // Handle Login
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!form.email || !form.password) {

      alert("Please fill all fields");

      return;
    }

    // Get Saved Users
    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    // Find User
    const user = users.find(
      (u) =>
        u.email === form.email &&
        u.password === form.password
    );

    if (user) {

      // Save Logged User
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // Save Current User
      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      // Login Context
      login(user);

      alert("Login successful!");

      navigate("/");

    } else {

      alert("Invalid email or password");

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center p-4">

      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-5xl grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-green-600 to-green-800 text-white p-10">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2909/2909762.png"
            alt="logo"
            className="w-28 h-28 mb-6"
          />

          <h1 className="text-5xl font-bold leading-tight">
            Welcome Back
          </h1>

          <p className="mt-6 text-green-100 text-lg leading-relaxed">
            Login to continue buying fresh products
            directly from farmers using KisanMarket 🌾
          </p>

          <div className="mt-10">

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🚜</span>
              <p>Fresh farm products</p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💳</span>
              <p>Secure Razorpay payments</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">📦</span>
              <p>Track your orders easily</p>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">

          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-6">

            <img
              src="https://cdn-icons-png.flaticon.com/512/2909/2909762.png"
              alt="logo"
              className="w-20 h-20 mx-auto mb-4"
            />

            <h1 className="text-3xl font-bold text-green-700">
              KisanMarket
            </h1>

          </div>

          {/* Heading */}
          <div className="mb-8">

            <h2 className="text-4xl font-bold text-gray-800">
              Login
            </h2>

            <p className="text-gray-500 mt-2">
              Access your account and continue shopping
            </p>

          </div>

          {/* Demo Credentials */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">

            <h3 className="text-sm font-bold text-blue-800 mb-2">
              Demo Credentials
            </h3>

            <div className="text-sm text-blue-700 space-y-1">

              <p>
                <strong>Farmer:</strong>
                {" "}
                farmer@example.com
              </p>

              <p>
                <strong>Vendor:</strong>
                {" "}
                vendor@example.com
              </p>

              <p>
                <strong>Password:</strong>
                {" "}
                any password
              </p>

            </div>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />

            </div>

            {/* Login Button */}
            <Button
              text="Login"
              className="w-full"
            />

          </form>

          {/* Register */}
          <p className="text-center text-gray-600 mt-8">

            Don&apos;t have an account?

            <Link
              to="/register"
              className="text-green-600 font-bold hover:underline ml-1"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;