import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link, useSearchParams } from "react-router-dom";

const ORDER_STATUS_BADGE = {
  processing: "badge-warning",
  confirmed:  "badge-info",
  shipped:    "badge-primary",
  delivered:  "badge-success",
  cancelled:  "badge-error",
};

const PAYMENT_STATUS_BADGE = {
  pending:  "badge-warning",
  paid:     "badge-success",
  failed:   "badge-error",
};

export default function Orders() {

  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams]        = useSearchParams();

  const paymentParam = searchParams.get("payment"); // failed | cancelled
  const errorParam   = searchParams.get("error");   // payment_not_found

  useEffect(() => {
    api.get("/api/orders/")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-[50vh]">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">

      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {/* ── Payment redirect alerts ── */}
      {paymentParam === "failed" && (
        <div className="alert alert-error mb-4">
          ❌ Payment failed. Please try again from your order.
        </div>
      )}
      {paymentParam === "cancelled" && (
        <div className="alert alert-warning mb-4">
          ⚠️ Payment cancelled. Your order is saved — you can pay later.
        </div>
      )}
      {errorParam === "payment_not_found" && (
        <div className="alert alert-warning mb-4">
          ⚠️ Payment record not found. Please contact support.
        </div>
      )}

      {/* ── Empty state ── */}
      {orders.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-4">🛒</p>
          <p className="mb-4">You have no orders yet.</p>
          <Link to="/customer-dashboard/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (

        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="border rounded-xl p-4 shadow-sm bg-base-100 hover:shadow-md transition"
            >

              {/* ── Top row: order id + badges ── */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                <div>
                  <p className="font-semibold text-lg">Order #{order.id}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(order.created_at).toLocaleDateString("en-BD", {
                      year:  "numeric",
                      month: "long",
                      day:   "numeric",
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className={`badge ${ORDER_STATUS_BADGE[order.order_status] ?? "badge-ghost"}`}>
                    {order.order_status}
                  </span>
                  <span className={`badge ${PAYMENT_STATUS_BADGE[order.payment_status] ?? "badge-ghost"}`}>
                    {order.payment_status}
                  </span>
                </div>

              </div>

              {/* ── Bottom row: amount + action ── */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                <p className="font-bold text-green-600 text-lg">
                  ৳ {order.total_amount}
                </p>

                <div className="flex gap-2">

                  {/* Retry payment if still pending */}
                  {order.payment_status === "pending" && (
                    <Link
                      to={`/customer-dashboard/checkout?retry=${order.id}`}
                      className="btn btn-sm btn-warning"
                    >
                      Retry Payment
                    </Link>
                  )}

                  <Link
                    to={`/customer-dashboard/orders/${order.id}`}
                    className="btn btn-sm btn-info"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            </div>
          ))}
        </div>

      )}

    </div>
  );
}