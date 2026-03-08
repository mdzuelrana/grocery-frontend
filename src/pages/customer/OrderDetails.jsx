import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";

export default function OrderDetails() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {

    api.get(`/api/orders/${id}/`)
      .then(res => setOrder(res.data));

  }, [id]);

  if (!order) return <Loader />;

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Order #{order.id}
      </h1>

      <p>Status: {order.status}</p>

      <div className="mt-6 space-y-4">

        {order.items.map(item => (

          <div key={item.id} className="border p-4">

            <p>{item.product_name}</p>

            <p>Quantity: {item.quantity}</p>

          </div>

        ))}

      </div>

    </div>
  );
}