import API from "../../api/axios";

function Checkout() {

  const handleCheckout = async () => {

    try {

      const order = await API.post("/api/orders/", {});

      const orderId = order.data.id;

      const payment = await API.post(
        `/api/payment/pay/${orderId}/`
      );

      window.location.href = payment.data.payment_url;
      const url = payment.data.payment_url;

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