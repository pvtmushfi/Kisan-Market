import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Order";
import Profile from "./pages/Profile";


// Farmer Pages
import FarmerDashboard from "./farmer/FarmerDashboard";
import MyProducts from "./farmer/MyProduct";
import AddProduct from "./farmer/AddProduct";

// Auth Pages
import Login from "./auth/Login";
import Register from "./auth/Register";

// Layout
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

// Components
import Chatbot from "./components/Chatbot";

// Toast Notifications
import { Toaster } from "react-hot-toast";

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role Check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>

            {/* Toast Notifications */}
            <Toaster position="top-right" reverseOrder={false} />

            <div className="flex flex-col min-h-screen bg-gray-50">

              {/* Navbar */}
              <Navbar />

              {/* Main Content */}
              <div className="flex-grow">

                <Routes>

                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />

                  <Route
                    path="/products"
                    element={<Products />}
                  />

                  <Route path="/cart" element={<Cart />} />

                  <Route path="/chat" element={<Chatbot />} />

                  <Route path="/login" element={<Login />} />

                  <Route path="/register" element={<Register />} />

                  {/* Protected User Routes */}
                  <Route
                    path="/orders"
                    element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    }
                  />

                  {/* Farmer Protected Routes */}
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

                  {/* 404 Page Redirect */}
                  <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                  />

                </Routes>

              </div>

              {/* Footer */}
              <Footer />

            </div>

          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;