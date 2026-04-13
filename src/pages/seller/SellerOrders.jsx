import { useEffect, useState } from "react";
import API from "../../api/axios";
import SellerSidebar from "./SellerSidebar";

const ORDER_STATUS_BADGE = {
  processing: "badge-warning",
  confirmed:  "badge-info",
  shipped:    "badge-primary",
  delivered:  "badge-success",
  cancelled:  "badge-error",
};

const PAYMENT_STATUS_BADGE = {
  pending:   "badge-warning",
  paid:      "badge-success",
  failed:    "badge-error",
};

function SellerOrders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [expanded, setExpanded] = useState(null); // ✅ expanded order id

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // ✅ correct endpoint — seller's own product orders
      const res = await API.get("/api/seller-orders/");
      setOrders(res.data);
    } catch (err) {
      setError("Failed to load orders.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, order_status) => {
    try {
      await API.patch(`/api/seller-orders/${id}/`, { order_status });
      fetchOrders();
    } catch (err) {
      alert("Failed to update status.");
      console.error(err.response?.data);
    }
  };

  if (loading) return (
    <div className="flex">
      <SellerSidebar />
      <div className="flex-1 flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    </div>
  );

  return (
    <div className="flex">
      <SellerSidebar />

      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>

        {error && (
          <div className="alert alert-error mb-4">{error}</div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-4xl mb-3">📦</p>
            <p>No orders yet for your products.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order.id}
                className="border rounded-xl shadow-sm bg-base-100 overflow-hidden"
              >
                {/* ── Order Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4">

                  <div>
                    <p className="font-bold text-lg">Order #{order.id}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(order.created_at).toLocaleDateString("en-BD", {
                        year: "numeric", month: "long", day: "numeric"
                      })}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Customer: <span className="font-medium">{order.full_name || "—"}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center">
                    <span className={`badge ${ORDER_STATUS_BADGE[order.order_status] ?? "badge-ghost"}`}>
                      {order.order_status}
                    </span>
                    <span className={`badge ${PAYMENT_STATUS_BADGE[order.payment_status] ?? "badge-ghost"}`}>
                      {order.payment_status}
                    </span>
                    <span className="font-bold text-green-600">
                      ৳ {order.total_amount}
                    </span>
                  </div>

                </div>

                {/* ── Actions ── */}
                <div className="flex flex-wrap gap-2 px-4 pb-3 border-t pt-3">

                  {/* ✅ Status update buttons */}
                  {order.order_status === "processing" && (
                    <button
                      onClick={() => updateStatus(order.id, "confirmed")}
                      className="btn btn-sm btn-info"
                    >
                      Confirm Order
                    </button>
                  )}
                  {order.order_status === "confirmed" && (
                    <button
                      onClick={() => updateStatus(order.id, "shipped")}
                      className="btn btn-sm btn-primary"
                    >
                      Mark as Shipped
                    </button>
                  )}
                  {order.order_status === "shipped" && (
                    <button
                      onClick={() => updateStatus(order.id, "delivered")}
                      className="btn btn-sm btn-success"
                    >
                      Mark as Delivered
                    </button>
                  )}
                  {!["cancelled", "delivered"].includes(order.order_status) && (
                    <button
                      onClick={() => {
                        if (window.confirm("Cancel this order?"))
                          updateStatus(order.id, "cancelled");
                      }}
                      className="btn btn-sm btn-error btn-outline"
                    >
                      Cancel
                    </button>
                  )}

                  {/* ✅ Toggle items */}
                  <button
                    onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                    className="btn btn-sm btn-ghost ml-auto"
                  >
                    {expanded === order.id ? "Hide Items ▲" : "View Items ▼"}
                  </button>

                </div>

                {/* ── Order Items (expandable) ── */}
                {expanded === order.id && (
                  <div className="border-t px-4 py-3 bg-base-200">
                    <p className="font-semibold mb-3 text-sm">Items in this order:</p>
                    <div className="space-y-2">
                      {order.items.map(item => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 bg-base-100 rounded-lg p-3"
                        >
                          {item.product_image && (
                            <img
                              src={item.product_image}
                              alt={item.product_name}
                              className="w-12 h-12 object-cover rounded"
                              onError={e => e.target.style.display = "none"}
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.product_name}</p>
                            <p className="text-xs text-gray-400">
                              ৳ {item.price} × {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold text-green-600 text-sm">
                            ৳ {(parseFloat(item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Delivery info */}
                    <div className="mt-4 text-sm text-gray-500 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-gray-400">Phone</p>
                        <p className="font-medium">{order.phone || "—"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">City</p>
                        <p className="font-medium">{order.city || "—"}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-400">Address</p>
                        <p className="font-medium">{order.address || "—"}</p>
                      </div>
                      {order.notes && (
                        <div className="col-span-2">
                          <p className="text-gray-400">Notes</p>
                          <p className="font-medium">{order.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerOrders;