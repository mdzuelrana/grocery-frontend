import API from "../api/axios";

function Checkout() {

  const handleCheckout = async () => {

    const order = await API.post("/api/orders/");

    const orderId = order.data.id;

    const payment = await API.post(
      `/api/payment/pay/${orderId}/`
    );

    window.location.href = payment.data.gateway_url;
  };

  return (

    <div className="flex justify-center mt-20">

      <button
        className="btn btn-success"
        onClick={handleCheckout}
      >
        Pay with SSLCommerz
      </button>

    </div>
  );
}

export default Checkout;