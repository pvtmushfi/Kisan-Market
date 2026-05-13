import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Order";
import Profile from "./pages/Profile";

import FarmerDashboard from "./farmer/FarmerDashboard";
import MyProducts from "./farmer/MyProduct";
import AddProduct from "./farmer/AddProduct";

import Login from "./auth/Login";
import Register from "./auth/Register";

import IncomeSimulator from "./pages/IncomeSimulator";

import FarmMap from "./components/FarmMap";
import SetFarmLocation from "./components/SetFarmLocation";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Chatbot from "./components/Chatbot";

// Protected Route
function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      <div className="flex-grow">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route path="/profile" element={<Profile />} />

          <Route
            path="/farmer"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-products"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <MyProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-product"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route path="/simulator" element={<IncomeSimulator />} />
          <Route path="/farm-map" element={<FarmMap />} />
          <Route path="/set-location" element={<SetFarmLocation />} />

          <Route path="/chat" element={<Chatbot />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </div>

      <Footer />

    </div>
  );
}

export default App;