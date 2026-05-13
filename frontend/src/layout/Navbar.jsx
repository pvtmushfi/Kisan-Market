import VoiceSearch from "../components/VoiceSearch";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { cart = [] } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `px-3 py-1 rounded-full text-sm transition ${
      isActive
        ? "bg-white text-green-700 font-semibold"
        : "hover:bg-white/10"
    }`;

  const goProfile = () => navigate("/profile");

  const submitSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${search}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-green-700 text-white shadow-md">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-4 py-3">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          KisanMarket
        </Link>

        {/* SEARCH */}
        <form
          onSubmit={submitSearch}
          className="hidden md:flex bg-white rounded-full overflow-hidden"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="px-3 py-2 text-black outline-none"
          />

          <VoiceSearch
            onSearch={(val) => {
              setSearch(val);
              setTimeout(() => submitSearch(new Event("submit")), 0);
            }}
          />

          <button className="px-3 bg-yellow-400 text-black">
            Search
          </button>
        </form>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-2">

          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/products" className={navClass}>Products</NavLink>
          <NavLink to="/simulator" className={navClass}>Income</NavLink>
          <NavLink to="/farm-map" className={navClass}>Farm Map</NavLink>

          {user?.role === "vendor" && (
            <NavLink to="/cart" className={navClass}>
              Cart ({cart.length})
            </NavLink>
          )}

          <Link to="/chat" className="px-3 py-1 rounded-full hover:bg-white/10">
            Chat
          </Link>

          {user && (
            <Link to="/orders" className="px-3 py-1 rounded-full hover:bg-white/10">
              Orders
            </Link>
          )}

          {/* PROFILE BUTTON */}
          {user ? (
            <div className="flex items-center gap-2 ml-2">

              <button
                onClick={goProfile}
                className="flex items-center gap-2 bg-white text-green-700 px-3 py-1 rounded-full"
              >
                <img
                  src={
                    user.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  className="w-7 h-7 rounded-full"
                />
                {user.name}
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded-full"
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="px-3 py-1 rounded-full hover:bg-white/10">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-green-700 px-3 py-1 rounded-full"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">

          <NavLink to="/" className="block" onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/products" className="block" onClick={() => setOpen(false)}>
            Products
          </NavLink>

          <NavLink to="/simulator" className="block" onClick={() => setOpen(false)}>
            Income
          </NavLink>

          <NavLink to="/farm-map" className="block" onClick={() => setOpen(false)}>
            Farm Map
          </NavLink>

          {user?.role === "vendor" && (
            <NavLink to="/cart" className="block" onClick={() => setOpen(false)}>
              Cart ({cart.length})
            </NavLink>
          )}

          {user && (
            <button
              onClick={goProfile}
              className="w-full text-left bg-white text-green-700 px-3 py-2 rounded-md"
            >
              {user.name}
            </button>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 py-2 rounded-md"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;