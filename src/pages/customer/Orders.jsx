import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    api.get("/api/orders/")
      .then(res => setOrders(res.data));

  }, []);

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        My Orders
      </h1>

      {orders.map(order => (

        <div
          key={order.id}
          className="border p-4 mb-4"
        >

          <p>Order #{order.id}</p>

          <p>Status: {order.status}</p>

          <Link
            to={`/orders/${order.id}`}
            className="btn btn-sm btn-info mt-2"
          >
            Details
          </Link>

        </div>

      ))}

    </div>
  );
}