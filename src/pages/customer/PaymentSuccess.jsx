import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {

  const navigate = useNavigate();

  useEffect(() => {

    // auto redirect after 3 seconds
    setTimeout(() => {
      navigate("/customer-dashboard/orders");
    }, 3000);

  }, []);

  return (

    <div className="flex flex-col items-center justify-center h-[70vh]">

      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Payment Successful
      </h1>

      <p className="text-gray-600 mb-4">
        Your order has been placed successfully.
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