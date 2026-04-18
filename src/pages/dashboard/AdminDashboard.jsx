import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const ORDER_STATUS_BADGE = {
  processing: "badge-warning",
  confirmed:  "badge-info",
  shipped:    "badge-primary",
  delivered:  "badge-success",
  cancelled:  "badge-error",
};

const PAYMENT_BADGE = {
  pending: "badge-warning",
  paid:    "badge-success",
  failed:  "badge-error",
};

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats,    setStats]    = useState(null);
  const [products, setProducts] = useState([]);
  const [orders,   setOrders]   = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    Promise.all([
      API.get("/api/admin-dashboard/"),  // ✅ stats
      API.get("/api/admin-products/"),   // ✅ all products
      API.get("/api/admin-orders/"),     // ✅ all orders
    ])
      .then(([statsRes, productsRes, ordersRes]) => {
        setStats(statsRes.data);
        setProducts(productsRes.data);
        setOrders(ordersRes.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/api/admin-products/${id}/`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  const lowStock     = products.filter(p => p.stock <= 5);
  const recentOrders = orders.slice(0, 6);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );

  return (
    <div className="p-6 bg-base-200 min-h-screen">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-400">Overview of your grocery store</p>
        </div>
        <Link to="/admin/products" className="btn btn-sm btn-primary">
          + Add Product
        </Link>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="card bg-primary text-primary-content shadow p-5">
          <p className="text-sm opacity-75">Total Revenue</p>
          <p className="text-3xl font-bold mt-1">
            ৳ {parseFloat(stats.total_revenue).toFixed(0)}
          </p>
          <p className="text-xs opacity-60 mt-1">from paid orders</p>
        </div>

        <div className="card bg-base-100 shadow p-5">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold mt-1">{stats.total_orders}</p>
          <p className="text-xs text-success mt-1">{stats.delivered} delivered</p>
        </div>

        <div className="card bg-base-100 shadow p-5">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-3xl font-bold mt-1">{stats.total_products}</p>
          {lowStock.length > 0 && (
            <p className="text-xs text-error mt-1">⚠ {lowStock.length} low stock</p>
          )}
        </div>

        <div className="card bg-base-100 shadow p-5">
          <p className="text-sm text-gray-500">Customers</p>
          <p className="text-3xl font-bold mt-1">{stats.total_users}</p>
          <p className="text-xs text-gray-400 mt-1">registered users</p>
        </div>

      </div>

      {/* ── Order Status Breakdown ── */}
      <div className="card bg-base-100 shadow p-5 mb-6">
        <h2 className="font-semibold text-lg mb-4">Order Status Breakdown</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "Processing", value: stats.processing, color: "text-warning" },
            { label: "Confirmed",  value: stats.confirmed,  color: "text-info" },
            { label: "Shipped",    value: stats.shipped,    color: "text-primary" },
            { label: "Delivered",  value: stats.delivered,  color: "text-success" },
            { label: "Cancelled",  value: stats.cancelled,  color: "text-error" },
          ].map(s => (
            <div key={s.label} className="text-center border rounded-xl py-4">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* ── Recent Orders ── */}
        <div className="card bg-base-100 shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-primary hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-gray-400 text-sm">No orders yet.</p>
            ) : recentOrders.map(order => (
              <div
                key={order.id}
                className="flex items-center justify-between border rounded-lg p-3"
              >
                <div>
                  <p className="font-medium text-sm">Order #{order.id}</p>
                  <p className="text-xs text-gray-400">{order.full_name || "—"}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleDateString("en-BD", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`badge badge-sm ${ORDER_STATUS_BADGE[order.order_status] ?? "badge-ghost"}`}>
                    {order.order_status}
                  </span>
                  <span className={`badge badge-sm ${PAYMENT_BADGE[order.payment_status] ?? "badge-ghost"}`}>
                    {order.payment_status}
                  </span>
                  <p className="text-sm font-bold text-green-600">৳ {order.total_amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Low Stock Alert ── */}
        <div className="card bg-base-100 shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">
              Low Stock Alert
              {lowStock.length > 0 && (
                <span className="badge badge-error badge-sm ml-2">{lowStock.length}</span>
              )}
            </h2>
            <Link to="/admin/products" className="text-sm text-primary hover:underline">
              Manage →
            </Link>
          </div>
          {lowStock.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">✅</p>
              <p className="text-sm">All products have sufficient stock.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lowStock.map(p => (
                <div
                  key={p.id}
                  className="flex items-center justify-between border rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    {p.image_url && (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded"
                        onError={e => e.target.style.display = "none"}
                      />
                    )}
                    <div>
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="text-xs text-gray-400">৳ {p.price}</p>
                    </div>
                  </div>
                  <span className={`badge ${p.stock === 0 ? "badge-error" : "badge-warning"}`}>
                    {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ── Products Table ── */}
      <div className="card bg-base-100 shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">All Products</h2>
          <Link to="/admin/products" className="text-sm text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 8).map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      {p.image_url && (
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded"
                          onError={e => e.target.style.display = "none"}
                        />
                      )}
                      <p className="font-medium text-sm">{p.name}</p>
                    </div>
                  </td>
                  <td className="text-sm text-gray-500">{p.category_name || "—"}</td>
                  <td className="font-medium">৳ {p.price}</td>
                  <td>
                    <span className={`badge badge-sm ${
                      p.stock === 0 ? "badge-error"   :
                      p.stock <= 5  ? "badge-warning" :
                      "badge-success"
                    }`}>
                      {p.stock === 0 ? "Out" : p.stock}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                        className="btn btn-xs btn-info"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;