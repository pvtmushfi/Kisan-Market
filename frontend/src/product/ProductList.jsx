import ProductCard from "./ProductCard";

function ProductList({ products = [], onAdd, onView }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

      {/* ✅ Safety check */}
      {products.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          No products available
        </div>
      ) : (
        products.map((p) => (
          <ProductCard
            key={p._id || p.id}
            product={p}
            onAdd={onAdd}
            onView={onView}   // ✅ View details support
          />
        ))
      )}

    </div>
  );
}

export default ProductList;