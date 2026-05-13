import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { getProducts } from "../services/productService";
import ProductList from "../product/ProductList";

function Products() {
  const [products, setProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const { user } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);

  const category = searchParams.get("category");

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        let fetchedProducts = response.data.data || [];

        if (category) {
          fetchedProducts = fetchedProducts.filter(
            (p) => p.category === category
          );
        }

        setProducts(fetchedProducts);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // ================= ADD TO CART =================
  const handleAdd = (product, quantity = 1) => {
    if (!user || user.role !== "vendor") return;

    const productId = product._id || product.id;

    const existingItem = cart.find(
      (item) => (item._id || item.id) === productId
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        (item._id || item.id) === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity }];
    }

    setCart(updatedCart);

    alert(`${product.name} added to cart`);

    // ================= GENERATE RECOMMENDATION =================
    const lastAddedCategory = product.category;

    const recommendedProducts = products
      .filter(
        (p) =>
          p.category === lastAddedCategory &&
          p.id !== product.id
      )
      .slice(0, 4);

    setRecommended(recommendedProducts);

    // 🔥 SHOW ONLY AFTER ADD TO CART
    setShowRecommendations(true);
  };

  // ================= UI TEXT =================
  const getPageTitle = () => {
    if (category) return `${category} - Fresh from Farmers`;
    if (!user) return "Fresh Products from Farmers";
    if (user.role === "farmer") return "Farmer Market Dashboard";
    if (user.role === "vendor") return "Buy Fresh Farm Products";
    return "Products";
  };

  // ================= LOADING =================
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading products...
      </div>
    );

  // ================= ERROR =================
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-green-600 text-white py-8 px-6">
        <h1 className="text-3xl font-bold">{getPageTitle()}</h1>

        {user && (
          <p className="mt-3 text-green-100 text-sm">
            Logged in as <strong>{user.name}</strong> ({user.role})
          </p>
        )}
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto p-6">
        <ProductList products={products} onAdd={handleAdd} />
      </div>

      {/* ================= RECOMMENDATION (ONLY AFTER ADD) ================= */}
      {showRecommendations && recommended.length > 0 && (
        <div className="max-w-7xl mx-auto p-6">

          <h2 className="text-2xl font-bold mb-4 text-green-700">
            🌾 Recommended for You
          </h2>

          <ProductList
            products={recommended}
            onAdd={handleAdd}
          />
        </div>
      )}

    </div>
  );
}

export default Products;