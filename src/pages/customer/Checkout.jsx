import { useState } from "react";
import API from "../../api/axios";

function Checkout() {

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckout = async () => {

    try {

      // 1️⃣ Create order with user info
      const order = await API.post("/api/orders/", form);

      const orderId = order.data.id;

      // 2️⃣ Call correct payment endpoint
      const payment = await API.post(
        `/api/payment/pay/${orderId}/`
      );

      const url = payment.data.payment_url;

      // 3️⃣ Redirect safely
      if (url) {
        window.location.href = url;
      } else {
        alert("Payment URL not received");
      }

    } catch (error) {

      console.log(error.response?.data);
      alert("Checkout failed");

    }

  };

  return (

    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6 text-center">
        Checkout
      </h1>

      <div className="space-y-4">

        {/* FULL NAME */}
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          className="input input-bordered w-full"
          onChange={handleChange}
        />

        {/* PHONE */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="input input-bordered w-full"
          onChange={handleChange}
        />

        {/* ADDRESS */}
        <textarea
          name="address"
          placeholder="Shipping Address"
          className="textarea textarea-bordered w-full"
          onChange={handleChange}
        />

        {/* BUTTON */}
        <button
          onClick={handleCheckout}
          className="btn btn-success w-full"
        >
          Proceed to Payment
        </button>

      </div>

    </div>

  );
}

export default Checkout;