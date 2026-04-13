import { useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate       = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId        = searchParams.get("order_id");

  // ✅ read token from localStorage — survives full page reload from SSLCommerz
  const isLoggedIn = !!localStorage.getItem("access");  // adjust key if yours is different

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isLoggedIn ? "/customer-dashboard/orders" : "/login");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate, isLoggedIn]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">

      <div className="text-6xl mb-4">✅</div>

      <h1 className="text-3xl font-bold text-green-600 mb-2">
        Payment Successful!
      </h1>

      {orderId && (
        <p className="text-gray-500 mb-2">
          Order ID: <span className="font-semibold text-gray-700">#{orderId}</span>
        </p>
      )}

      <p className="text-gray-400 mb-6">
        Redirecting to your orders in a few seconds...
      </p>

      <Link to="/customer-dashboard/orders" className="btn btn-primary">
        View Orders
      </Link>

    </div>
  );
}