import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../api/axios";

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const retryOrderId = searchParams.get("retry"); // ✅ from Orders page retry button

  const [form, setForm] = useState({
    full_name: "",
    phone:     "",
    address:   "",
    city:      "",
    notes:     "",
  });
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [cartEmpty, setCartEmpty] = useState(false);

  // ✅ pre-fill form if user profile has data
  useEffect(() => {
    API.get("/auth/users/me/")
      .then(res => {
        setForm(prev => ({
          ...prev,
          full_name: res.data.first_name
            ? `${res.data.first_name} ${res.data.last_name}`.trim()
            : prev.full_name,
        }));
      })
      .catch(() => {});

    // ✅ check cart is not empty before showing form
    API.get("/api/cart/")
      .then(res => {
        if (res.data.length === 0) setCartEmpty(true);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.full_name.trim()) return "Full name is required.";
    if (!form.phone.trim())     return "Phone number is required.";
    if (form.phone.length < 11) return "Enter a valid phone number (11 digits).";
    if (!form.address.trim())   return "Shipping address is required.";
    return null;
  };

  const handleCheckout = async () => {
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    setError("");

    try {
      let orderId = retryOrderId; // ✅ reuse existing order if retrying

      if (!orderId) {
        // 1️⃣ create new order
        const orderRes = await API.post("/api/orders/", form);
        orderId = orderRes.data.id;
      } else {
        // retrying — just update delivery info on existing order
        await API.patch(`/api/orders/${orderId}/`, form);
      }

      // 2️⃣ initiate payment
      const paymentRes = await API.post(`/api/payment/pay/${orderId}/`);
      const url        = paymentRes.data.payment_url;

      if (url) {
        window.location.href = url;
      } else {
        setError("Payment URL not received. Please try again.");
        setLoading(false);
      }

    } catch (err) {
      console.error(err.response?.data);
      const msg = err.response?.data?.error
        || (Array.isArray(err.response?.data) ? err.response.data[0] : null)
        || "Checkout failed. Please try again.";
      setError(msg);
      setLoading(false);
    }
  };

  // ✅ cart is empty — don't show checkout form
  if (cartEmpty && !retryOrderId) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <p className="text-4xl mb-4">🛒</p>
        <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products before checking out.</p>
        <button
          onClick={() => navigate("/customer-dashboard/products")}
          className="btn btn-primary"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-2 text-center">
        {retryOrderId ? "Retry Payment" : "Checkout"}
      </h1>
      <p className="text-center text-gray-500 text-sm mb-6">
        {retryOrderId
          ? `Retrying payment for Order #${retryOrderId}`
          : "Fill in your delivery details to continue"
        }
      </p>

      <div className="space-y-4">

        {error && (
          <div className="alert alert-error text-sm">⚠️ {error}</div>
        )}

        <input
          type="text"
          name="full_name"
          placeholder="Full Name *"
          className="input input-bordered w-full"
          value={form.full_name}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number * (e.g. 01XXXXXXXXX)"
          className="input input-bordered w-full"
          value={form.phone}
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Shipping Address *"
          rows={3}
          className="textarea textarea-bordered w-full"
          value={form.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City (e.g. Dhaka, Sylhet)"
          className="input input-bordered w-full"
          value={form.city}
          onChange={handleChange}
        />
        <textarea
          name="notes"
          placeholder="Delivery notes (optional)"
          rows={2}
          className="textarea textarea-bordered w-full"
          value={form.notes}
          onChange={handleChange}
        />

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="btn btn-success w-full"
        >
          {loading ? (
            <><span className="loading loading-spinner loading-sm" /> Redirecting to payment...</>
          ) : (
            "Proceed to Payment →"
          )}
        </button>

        <button
          onClick={() => navigate(retryOrderId ? "/customer-dashboard/orders" : "/customer-dashboard/cart")}
          disabled={loading}
          className="btn btn-ghost w-full"
        >
          ← {retryOrderId ? "Back to Orders" : "Back to Cart"}
        </button>

      </div>
    </div>
  );
}