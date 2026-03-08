import { useEffect, useState } from "react";
import API from "../../api/axios";

function SellerDashboard() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/api/admin-orders/")
      .then(res => setOrders(res.data));
  }, []);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Seller Orders
      </h1>

      {orders.map(order => (

        <div
          key={order.id}
          className="p-4 border mb-3"
        >

          Order #{order.id}

        </div>

      ))}

    </div>
  );
}

export default SellerDashboard;