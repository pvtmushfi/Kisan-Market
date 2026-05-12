import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const cartContext = useContext(CartContext);

  const authContext = useContext(AuthContext);

  const cart = cartContext?.cart || [];

  const user = authContext?.user || null;

  const logout =
    authContext?.logout || (() => {});

  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const handleLogout = () => {

    logout();

    setMobileMenuOpen(false);

    navigate("/login");
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white shadow-lg">

      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >

          <img
            src="https://cdn-icons-png.flaticon.com/512/2909/2909762.png"
            alt="logo"
            className="w-12 h-12 rounded-full bg-white p-1 shadow-md"
          />

          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              KisanMarket
            </h1>

            <p className="text-xs text-green-100">
              Fresh From Farmers 🌾
            </p>
          </div>

        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold"
                : "hover:text-yellow-200 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold"
                : "hover:text-yellow-200 transition"
            }
          >
            Products
          </NavLink>

          {/* Vendor */}
          {user?.role === "vendor" && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-bold relative"
                  : "hover:text-yellow-200 transition relative"
              }
            >
              🛒 Cart

              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart?.length}
                </span>
              )}
            </NavLink>
          )}

          {/* Orders */}
          {user && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-bold"
                  : "hover:text-yellow-200 transition"
              }
            >
              Orders
            </NavLink>
          )}

          {/* Farmer */}
          {user?.role === "farmer" && (
            <>
              <NavLink
                to="/farmer"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 font-bold"
                    : "hover:text-yellow-200 transition"
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/my-products"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 font-bold"
                    : "hover:text-yellow-200 transition"
                }
              >
                My Products
              </NavLink>
            </>
          )}

          {/* Chat */}
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-bold"
                : "hover:text-yellow-200 transition"
            }
          >
            AI Chat
          </NavLink>

          {/* User Section */}
          {user ? (
            <>
              {/* Profile Button */}
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 transition"
              >

                <img
                  src={
                    user?.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover bg-white"
                />

                <span className="text-sm font-medium">
                  {user.name}
                </span>

              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hover:text-yellow-200 transition"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Register
              </NavLink>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          className="md:hidden text-3xl"
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (

        <div className="md:hidden bg-green-700 px-5 py-4 space-y-4 shadow-lg">

          <NavLink
            to="/"
            onClick={closeMenu}
            className="block hover:text-yellow-200"
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeMenu}
            className="block hover:text-yellow-200"
          >
            Products
          </NavLink>

          {/* Vendor */}
          {user?.role === "vendor" && (
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className="block hover:text-yellow-200"
            >
              🛒 Cart ({cart?.length})
            </NavLink>
          )}

          {/* Orders */}
          {user && (
            <NavLink
              to="/orders"
              onClick={closeMenu}
              className="block hover:text-yellow-200"
            >
              Orders
            </NavLink>
          )}

          {/* Farmer */}
          {user?.role === "farmer" && (
            <>
              <NavLink
                to="/farmer"
                onClick={closeMenu}
                className="block hover:text-yellow-200"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/my-products"
                onClick={closeMenu}
                className="block hover:text-yellow-200"
              >
                My Products
              </NavLink>
            </>
          )}

          {/* Chat */}
          <NavLink
            to="/chat"
            onClick={closeMenu}
            className="block hover:text-yellow-200"
          >
            AI Chat
          </NavLink>

          {/* Mobile Profile */}
          {user ? (
            <>
              <Link
                to="/profile"
                onClick={closeMenu}
                className="flex items-center gap-3 border-t border-green-500 pt-4"
              >

                <img
                  src={
                    user?.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover bg-white"
                />

                <div>
                  <p className="font-semibold">
                    {user.name}
                  </p>

                  <p className="text-xs text-green-100">
                    {user.role}
                  </p>
                </div>

              </Link>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="block hover:text-yellow-200"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={closeMenu}
                className="block bg-white text-green-700 text-center py-2 rounded-lg font-semibold"
              >
                Register
              </NavLink>
            </>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;