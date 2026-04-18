import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [deleting, setDeleting] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/api/admin-products/"); // ✅ admin endpoint
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    setDeleting(id);
    try {
      await API.delete(`/api/admin-products/${id}/`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete product.");
    } finally {
      setDeleting(null);
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category_name || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center h-[50vh]">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );

  return (
    <div>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-gray-400">{products.length} total products</p>
        </div>
        <input
          type="text"
          placeholder="Search by name or category..."
          className="input input-bordered w-full sm:w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">📦</p>
          <p>No products found{search ? ` for "${search}"` : ""}.</p>
        </div>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(p => (
            <div
              key={p.id}
              className="card bg-base-100 shadow hover:shadow-md transition overflow-hidden"
            >
              {/* ── Product Image ── */}
              <figure className="relative h-48 bg-base-200">
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="w-full h-full items-center justify-center text-gray-300 text-4xl"
                  style={{ display: p.image_url ? "none" : "flex" }}
                >
                  🖼
                </div>

                {/* Stock badge overlay */}
                <div className="absolute top-2 right-2">
                  <span className={`badge badge-sm ${
                    p.stock === 0 ? "badge-error"   :
                    p.stock <= 5  ? "badge-warning" :
                    "badge-success"
                  }`}>
                    {p.stock === 0 ? "Out of stock" : `${p.stock} in stock`}
                  </span>
                </div>
              </figure>

              {/* ── Card Body ── */}
              <div className="card-body p-4">

                {/* Category */}
                {p.category_name && (
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    {p.category_name}
                  </span>
                )}

                {/* Name */}
                <h2 className="font-bold text-base leading-tight">{p.name}</h2>

                {/* Description */}
                {p.description && (
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {p.description}
                  </p>
                )}

                {/* Price + Stock row */}
                <div className="flex items-center justify-between mt-1">
                  <p className="text-lg font-bold text-green-600">৳ {p.price}</p>
                  <p className="text-xs text-gray-400">Stock: {p.stock}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                    className="btn btn-info btn-sm flex-1"
                  >
                    ✏ Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    disabled={deleting === p.id}
                    className="btn btn-error btn-sm flex-1"
                  >
                    {deleting === p.id
                      ? <span className="loading loading-spinner loading-xs" />
                      : "🗑 Delete"
                    }
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProducts;