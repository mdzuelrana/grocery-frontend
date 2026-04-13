import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

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

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/orders/${id}/`)
      .then(res => setOrder(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-[50vh]">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );

  if (!order) return (
    <div className="text-center py-20">
      <p className="text-gray-500 mb-4">Order not found.</p>
      <Link to="/customer-dashboard/orders" className="btn btn-primary">
        Back to Orders
      </Link>
    </div>
  );

  const subtotal = order.items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity, 0
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/customer-dashboard/orders" className="btn btn-ghost btn-sm">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold">Order #{order.id}</h1>
      </div>

      {/* ── Status Card ── */}
      <div className="bg-base-100 border rounded-xl p-5 mb-5 shadow-sm">
        <h2 className="font-semibold text-lg mb-3">Order Status</h2>
        <div className="flex flex-wrap gap-3">
          <div>
            <p className="text-xs text-gray-400 mb-1">Order</p>
            <span className={`badge ${ORDER_STATUS_BADGE[order.order_status] ?? "badge-ghost"}`}>
              {order.order_status}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Payment</p>
            <span className={`badge ${PAYMENT_STATUS_BADGE[order.payment_status] ?? "badge-ghost"}`}>
              {order.payment_status}
            </span>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-gray-400 mb-1">Placed on</p>
            <p className="text-sm font-medium">
              {new Date(order.created_at).toLocaleDateString("en-BD", {
                year: "numeric", month: "long", day: "numeric"
              })}
            </p>
          </div>
        </div>
      </div>

      {/* ── Delivery Info ── */}
      <div className="bg-base-100 border rounded-xl p-5 mb-5 shadow-sm">
        <h2 className="font-semibold text-lg mb-3">Delivery Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-400">Name</p>
            <p className="font-medium">{order.full_name || "—"}</p>
          </div>
          <div>
            <p className="text-gray-400">Phone</p>
            <p className="font-medium">{order.phone || "—"}</p>
          </div>
          <div>
            <p className="text-gray-400">Address</p>
            <p className="font-medium">{order.address || "—"}</p>
          </div>
          <div>
            <p className="text-gray-400">City</p>
            <p className="font-medium">{order.city || "—"}</p>
          </div>
          {order.notes && (
            <div className="col-span-2">
              <p className="text-gray-400">Delivery Notes</p>
              <p className="font-medium">{order.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Items ── */}
      <div className="bg-base-100 border rounded-xl p-5 mb-5 shadow-sm">
        <h2 className="font-semibold text-lg mb-4">Items Ordered</h2>
        <div className="space-y-4">
          {order.items.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
            >
              {item.product_image && (
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="w-14 h-14 object-cover rounded-lg"
                  onError={e => e.target.style.display = "none"}
                />
              )}
              <div className="flex-1">
                <p className="font-medium">{item.product_name}</p>
                <p className="text-sm text-gray-400">
                  ৳ {item.price} × {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-green-600">
                ৳ {(parseFloat(item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Summary ── */}
      <div className="bg-base-100 border rounded-xl p-5 shadow-sm">
        <h2 className="font-semibold text-lg mb-3">Order Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span>৳ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
            <span>Total</span>
            <span className="text-green-600">৳ {parseFloat(order.total_amount).toFixed(2)}</span>
          </div>
        </div>
      </div>

    </div>
  );
}