import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import SellerSidebar from "./SellerSidebar";

function SellerDashboard() {
  const [stats, setStats]         = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    Promise.all([
      API.get("/api/products/"),
      API.get("/api/seller-orders/"),
    ])
      .then(([productsRes, ordersRes]) => {
        const products = productsRes.data;
        const orders   = ordersRes.data;

        // ── compute stats ─────────────────────────────────────────────────
        const totalRevenue = orders
          .filter(o => o.payment_status === "paid")
          .reduce((sum, o) => sum + parseFloat(o.total_amount), 0);

        const statusCount = (status) =>
          orders.filter(o => o.order_status === status).length;

        setStats({
          totalProducts:  products.length,
          totalOrders:    orders.length,
          processing:     statusCount("processing"),
          confirmed:      statusCount("confirmed"),
          shipped:        statusCount("shipped"),
          delivered:      statusCount("delivered"),
          cancelled:      statusCount("cancelled"),
          totalRevenue,
          lowStock: products.filter(p => p.stock <= 5).length,
        });

        // ── recent 5 orders ───────────────────────────────────────────────
        setRecentOrders(orders.slice(0, 5));

        // ── top products by order count ───────────────────────────────────
        const productCount = {};
        orders.forEach(order => {
          order.items?.forEach(item => {
            const key = item.product_name;
            productCount[key] = (productCount[key] || 0) + item.quantity;
          });
        });
        const sorted = Object.entries(productCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, qty]) => ({ name, qty }));
        setTopProducts(sorted);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex">
      <SellerSidebar />
      <div className="flex-1 flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg" />
      </div>
    </div>
  );

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

  return (
    <div className="flex">
      <SellerSidebar />

      <div className="p-6 flex-1 overflow-auto">

        <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="card bg-primary text-primary-content shadow p-5">
            <p className="text-sm opacity-80">Total Revenue</p>
            <p className="text-3xl font-bold mt-1">৳ {stats.totalRevenue.toFixed(0)}</p>
            <p className="text-xs opacity-60 mt-1">from paid orders</p>
          </div>

          <div className="card bg-base-100 shadow p-5">
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-3xl font-bold mt-1">{stats.totalProducts}</p>
            {stats.lowStock > 0 && (
              <p className="text-xs text-error mt-1">⚠ {stats.lowStock} low stock</p>
            )}
          </div>

          <div className="card bg-base-100 shadow p-5">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-3xl font-bold mt-1">{stats.totalOrders}</p>
            <p className="text-xs text-gray-400 mt-1">{stats.delivered} delivered</p>
          </div>

          <div className="card bg-base-100 shadow p-5">
            <p className="text-sm text-gray-500">Processing</p>
            <p className="text-3xl font-bold mt-1 text-warning">{stats.processing}</p>
            <p className="text-xs text-gray-400 mt-1">needs confirmation</p>
          </div>

        </div>

        {/* ── Order Status Breakdown ── */}
        <div className="card bg-base-100 shadow p-5 mb-8">
          <h2 className="font-semibold text-lg mb-4">Order Status Breakdown</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: "Processing", value: stats.processing, color: "text-warning" },
              { label: "Confirmed",  value: stats.confirmed,  color: "text-info" },
              { label: "Shipped",    value: stats.shipped,    color: "text-primary" },
              { label: "Delivered",  value: stats.delivered,  color: "text-success" },
              { label: "Cancelled",  value: stats.cancelled,  color: "text-error" },
            ].map(s => (
              <div key={s.label} className="text-center border rounded-lg py-3">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* ── Recent Orders ── */}
          <div className="lg:col-span-2 card bg-base-100 shadow p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Recent Orders</h2>
              <Link to="/seller/orders" className="text-sm text-primary hover:underline">
                View all →
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <p className="text-gray-400 text-sm">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map(order => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border rounded-lg p-3"
                  >
                    <div>
                      <p className="font-medium text-sm">Order #{order.id}</p>
                      <p className="text-xs text-gray-400">{order.full_name || "—"}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.created_at).toLocaleDateString("en-BD")}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`badge badge-sm ${ORDER_STATUS_BADGE[order.order_status] ?? "badge-ghost"}`}>
                        {order.order_status}
                      </span>
                      <span className={`badge badge-sm ${PAYMENT_BADGE[order.payment_status] ?? "badge-ghost"}`}>
                        {order.payment_status}
                      </span>
                      <p className="text-sm font-bold text-green-600">
                        ৳ {order.total_amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Top Products ── */}
          <div className="card bg-base-100 shadow p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Top Products</h2>
              <Link to="/seller/products" className="text-sm text-primary hover:underline">
                View all →
              </Link>
            </div>

            {topProducts.length === 0 ? (
              <p className="text-gray-400 text-sm">No data yet.</p>
            ) : (
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-300 w-5">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <div className="w-full bg-base-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{
                            width: `${Math.min(100, (p.qty / (topProducts[0]?.qty || 1)) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold">{p.qty}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* ── Quick Actions ── */}
        <div className="card bg-base-100 shadow p-5">
          <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/seller/products/add" className="btn btn-primary btn-sm">
              + Add Product
            </Link>
            <Link to="/seller/products" className="btn btn-outline btn-sm">
              Manage Products
            </Link>
            <Link to="/seller/orders" className="btn btn-outline btn-sm">
              View Orders
            </Link>
            <Link to="/seller/profile" className="btn btn-outline btn-sm">
              Edit Profile
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SellerDashboard;