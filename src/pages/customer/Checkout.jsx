import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function Checkout() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    phone:     "",
    address:   "",
    city:      "",   // ✅ added — matches updated Order model
    notes:     "",   // ✅ added — delivery instructions
  });

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // ✅ clear error when user starts typing
  };

  // ✅ basic frontend validation
  const validate = () => {
    if (!form.full_name.trim()) return "Full name is required.";
    if (!form.phone.trim())     return "Phone number is required.";
    if (form.phone.length < 11) return "Enter a valid Bangladeshi phone number.";
    if (!form.address.trim())   return "Shipping address is required.";
    return null;
  };

  const handleCheckout = async () => {

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1️⃣ Create order
      const orderRes = await API.post("/api/orders/", form);
      const orderId  = orderRes.data.id;

      // 2️⃣ Initiate SSLCommerz payment
      const paymentRes = await API.post(`/api/payment/pay/${orderId}/`);
      const url        = paymentRes.data.payment_url;

      // 3️⃣ Redirect to payment gateway
      if (url) {
        window.location.href = url; // ✅ hard redirect — leaves React app to go to SSLCommerz
      } else {
        setError("Payment URL not received. Please try again.");
        setLoading(false);
      }

    } catch (err) {
      console.error(err.response?.data);

      // ✅ show specific backend error if available
      const msg = err.response?.data?.error || "Checkout failed. Please try again.";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-2 text-center">Checkout</h1>
      <p className="text-center text-gray-500 text-sm mb-6">
        Fill in your delivery details to continue
      </p>

      <div className="space-y-4">

        {/* Error alert */}
        {error && (
          <div className="alert alert-error text-sm">
            ⚠️ {error}
          </div>
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
          placeholder="Delivery notes (optional) — e.g. Call before delivery"
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
            <>
              <span className="loading loading-spinner loading-sm" />
              Redirecting to payment...
            </>
          ) : (
            "Proceed to Payment →"
          )}
        </button>

        {/* ✅ back button — don't trap user on this page */}
        <button
          onClick={() => navigate("/customer-dashboard/cart")}
          disabled={loading}
          className="btn btn-ghost w-full"
        >
          ← Back to Cart
        </button>

      </div>
    </div>
  );
}