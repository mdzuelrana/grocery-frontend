import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");  // ✅ read from URL

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/customer-dashboard/orders");
    }, 4000);
    return () => clearTimeout(timer);  // ✅ cleanup on unmount
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">

      <div className="text-6xl mb-4">✅</div>

      <h1 className="text-3xl font-bold text-green-600 mb-2">
        Payment Successful!
      </h1>

      {orderId && (
        <p className="text-gray-500 mb-2">
          Order ID: <span className="font-semibold text-gray-700">#{orderId}</span>
        </p>
      )}

      <p className="text-gray-500 mb-6">
        Your order has been placed successfully. Redirecting to orders...
      </p>

      <button
        onClick={() => navigate("/customer-dashboard/orders")}
        className="btn btn-primary"
      >
        View Orders
      </button>

    </div>
  );
}