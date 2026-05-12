import ProductCard from "./ProductCard";

function ProductList({ products, onAdd, onView }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((p) => (
        <ProductCard
          key={p._id || p.id}
          product={p}
          onAdd={onAdd}
          onView={onView}   // ✅ NEW: send view handler
        />
      ))}
    </div>
  );
}

export default ProductList;