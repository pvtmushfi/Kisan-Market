import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  const recommendedProducts = selectedProduct
    ? products.filter(
        (p) =>
          p.category === selectedProduct.category &&
          p.id !== selectedProduct.id
      )
    : [];

  return (
    <div className="p-6 flex gap-6">

      {/* LEFT SIDE - PRODUCTS */}
      <div className="w-full">

        <h1 className="text-2xl font-bold mb-6">
          All Products
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow p-4 hover:shadow-lg transition"
            >

              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/300"
                }
                className="h-40 w-full object-cover rounded"
              />

              <h2 className="font-bold mt-2">
                {product.name}
              </h2>

              <p className="text-green-600 font-semibold">
                ₹{product.price}
              </p>

              <p className="text-sm text-gray-500">
                {product.category}
              </p>

              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => {
                    addToCart(product);
                    setSelectedProduct(product);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 rounded"
                >
                  Add
                </button>

                <button
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded"
                >
                  Details
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - PRODUCT DETAILS PANEL */}
      {selectedProduct && (
        <div className="w-[350px] sticky top-20 h-fit border rounded-lg p-4 shadow-lg bg-white">

          <button
            onClick={() => setSelectedProduct(null)}
            className="text-red-500 text-sm mb-2"
          >
            ✕ Close
          </button>

          <img
            src={selectedProduct.image}
            className="w-full h-48 object-cover rounded"
          />

          <h2 className="text-xl font-bold mt-3">
            {selectedProduct.name}
          </h2>

          <p className="text-green-600 font-semibold text-lg">
            ₹{selectedProduct.price}
          </p>

          <p className="text-gray-600 mt-2">
            {selectedProduct.description}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Category: {selectedProduct.category}
          </p>

          <button
            onClick={() => addToCart(selectedProduct)}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded"
          >
            Add to Cart
          </button>

          {/* RECOMMENDATIONS */}
          {recommendedProducts.length > 0 && (
            <div className="mt-6">

              <h3 className="font-bold mb-2">
                Similar Products
              </h3>

              <div className="space-y-2">

                {recommendedProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-2 border p-2 rounded"
                  >

                    <img
                      src={item.image}
                      className="w-12 h-12 object-cover rounded"
                    />

                    <div className="flex-1">

                      <p className="text-sm font-semibold">
                        {item.name}
                      </p>

                      <p className="text-green-600 text-sm">
                        ₹{item.price}
                      </p>

                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      className="text-xs bg-blue-600 text-white px-2 rounded"
                    >
                      Add
                    </button>

                  </div>
                ))}

              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default Products;