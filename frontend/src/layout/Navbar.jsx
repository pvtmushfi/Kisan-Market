import VoiceSearch from '../components/VoiceSearch';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {

    logout();

    setMobileMenuOpen(false);

    navigate("/login");
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };
  const handleSearch = (e) => {
  e.preventDefault();

  if (searchTerm.trim()) {
    navigate(`/products?search=${searchTerm}`);
  }
};

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      
      <Link to="/" className="text-2xl font-bold hover:opacity-90 transition">
        🚜 KisanMarket
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        <form
  id="search-form"
  onSubmit={handleSearch}
  className="flex items-center bg-white rounded overflow-hidden"
>
  <input
    type="text"
    placeholder="सर्च करें..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="px-3 py-2 text-black outline-none"
  />

  <VoiceSearch
    onSearch={(spoken) => {
      setSearchTerm(spoken);

      const fakeEvent = new Event("submit", {
        bubbles: true,
      });

      document
        .getElementById("search-form")
        ?.dispatchEvent(fakeEvent);
    }}
  />

  <button
    type="submit"
    className="bg-yellow-400 px-3 py-2 text-black"
  >
    🔍
  </button>
</form>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `hover:opacity-90 transition ${
              isActive
                ? "text-yellow-200 font-semibold underline underline-offset-4"
                : ""
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `hover:opacity-90 transition ${
              isActive
                ? "text-yellow-200 font-semibold underline underline-offset-4"
                : ""
            }`
          }
        >
          Products
        </NavLink>

        {/* Simulator */}
        <NavLink
          to="/simulator"
          className={({ isActive }) =>
            `hover:opacity-90 transition ${
              isActive
                ? "text-yellow-200 font-semibold underline underline-offset-4"
                : ""
            }`
          }
        >
          💰 Simulator
        </NavLink>

        {/* Farm Map */}
        <NavLink
          to="/farm-map"
          className={({ isActive }) =>
            `hover:opacity-90 transition ${
              isActive
                ? "text-yellow-200 font-semibold underline underline-offset-4"
                : ""
            }`
          }
        >
          🌾 Farm Map
        </NavLink>

        {/* Farmer Links */}
        {user?.role === "farmer" && (
          <>
            <NavLink
              to="/farmer"
              className={({ isActive }) =>
                `hover:opacity-90 transition ${
                  isActive
                    ? "text-yellow-200 font-semibold underline underline-offset-4"
                    : ""
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/my-products"
              className={({ isActive }) =>
                `hover:opacity-90 transition ${
                  isActive
                    ? "text-yellow-200 font-semibold underline underline-offset-4"
                    : ""
                }`
              }
            >
              My Products
            </NavLink>

            <NavLink
              to="/set-location"
              className={({ isActive }) =>
                `hover:opacity-90 transition ${
                  isActive
                    ? "text-yellow-200 font-semibold underline underline-offset-4"
                    : ""
                }`
              }
            >
              📍 Set Location
            </NavLink>
          </>
        )}

        {/* Vendor */}
        {user?.role === "vendor" && (
          <span className="text-sm opacity-75">🛒 Vendor</span>
        )}

        {/* Cart */}
        {user?.role === "vendor" && (
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative hover:opacity-90 transition ${
                isActive
                  ? "text-yellow-200 font-semibold underline underline-offset-4"
                  : ""
              }`
            }
          >
            🛒 Cart

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </NavLink>
        )}

        {/* Chat */}
        <Link to="/chat" className="hover:opacity-90 transition">
          AI Chat
        </Link>

        {/* Orders */}
        {user && (
          <Link to="/orders" className="hover:opacity-90 transition">
            Orders
          </Link>
        )}

        {/* Auth */}
        {user ? (
          <>
            <span className="text-sm">
              Hi, {user.name} ({user.role})
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:opacity-90 transition">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-white text-green-600 px-4 py-2 rounded font-medium hover:opacity-90 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-green-700 p-4 space-y-2 md:hidden">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block hover:opacity-90 ${
                isActive
                  ? "font-semibold underline underline-offset-4"
                  : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `block hover:opacity-90 ${
                isActive
                  ? "font-semibold underline underline-offset-4"
                  : ""
              }`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/simulator"
            className={({ isActive }) =>
              `block hover:opacity-90 ${
                isActive
                  ? "font-semibold underline underline-offset-4"
                  : ""
              }`
            }
          >
            💰 Simulator
          </NavLink>

          {/* Farm Map */}
          <NavLink
            to="/farm-map"
            className={({ isActive }) =>
              `block hover:opacity-90 ${
                isActive
                  ? "font-semibold underline underline-offset-4"
                  : ""
              }`
            }
          >
            🌾 Farm Map
          </NavLink>

          {/* Farmer Mobile Links */}
          {user?.role === "farmer" && (
            <>
              <NavLink
                to="/farmer"
                className={({ isActive }) =>
                  `block hover:opacity-90 ${
                    isActive
                      ? "font-semibold underline underline-offset-4"
                      : ""
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/my-products"
                className={({ isActive }) =>
                  `block hover:opacity-90 ${
                    isActive
                      ? "font-semibold underline underline-offset-4"
                      : ""
                  }`
                }
              >
                My Products
              </NavLink>

              <NavLink
                to="/set-location"
                className={({ isActive }) =>
                  `block hover:opacity-90 ${
                    isActive
                      ? "font-semibold underline underline-offset-4"
                      : ""
                  }`
                }
              >
                📍 Set Location
              </NavLink>
            </>
          )}

          {/* Vendor */}
          {user?.role === "vendor" && (
            <span className="block text-sm opacity-75">
              🛒 Vendor Account
            </span>
          )}

          {/* Cart */}
          {user?.role === "vendor" && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `block hover:opacity-90 ${
                  isActive
                    ? "font-semibold underline underline-offset-4"
                    : ""
                }`
              }
            >
              🛒 Cart ({cart?.length})
            </NavLink>
          )}

          {/* Orders */}
          {user && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `block hover:opacity-90 ${
                  isActive
                    ? "font-semibold underline underline-offset-4"
                    : ""
                }`
              }
            >
              Orders
            </NavLink>
          )}

          {/* Auth */}
          {user ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left hover:opacity-90"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="block hover:opacity-90">
                Login
              </Link>

              <Link to="/register" className="block hover:opacity-90">
                Register
              </Link>
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