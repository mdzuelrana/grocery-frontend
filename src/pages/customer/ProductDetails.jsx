import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [adding, setAdding]     = useState(false);
  const [added, setAdded]       = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get(`/api/products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = async () => {
    setAdding(true);
    try {
      await api.post("/api/cart/", {
        product: product.id,
        quantity,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        alert("Failed to add to cart. Please try again.");
      }
    } finally {
      setAdding(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );

  if (!product) return (
    <div className="text-center py-20 text-gray-500">
      Product not found.
    </div>
  );

  const inStock = product.stock > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

        {/* ── Image ── */}
        <div className="bg-base-100 rounded-xl shadow p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 sm:h-96 object-cover rounded-lg"
            onError={e => e.target.src = "/placeholder.png"}
          />
        </div>

        {/* ── Info ── */}
        <div className="flex flex-col justify-center gap-4">

          <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl font-semibold text-green-600">
            ৳ {product.price}
          </p>

          {/* Stock badge */}
          <span className={`badge w-fit ${inStock ? "badge-success" : "badge-error"}`}>
            {inStock ? `In Stock (${product.stock} left)` : "Out of Stock"}
          </span>

          <p className="text-gray-500 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity selector */}
          {inStock && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Quantity:</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1 hover:bg-base-200 text-lg font-bold"
                >
                  −
                </button>
                <span className="px-4 py-1 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="px-3 py-1 hover:bg-base-200 text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            onClick={addToCart}
            disabled={adding || !inStock}
            className={`btn w-full sm:w-52 ${added ? "btn-success" : "btn-primary"}`}
          >
            {adding ? (
              <span className="loading loading-spinner loading-sm" />
            ) : added ? (
              "✓ Added to Cart!"
            ) : inStock ? (
              "Add to Cart"
            ) : (
              "Out of Stock"
            )}
          </button>

        </div>
      </div>
    </div>
  );
}