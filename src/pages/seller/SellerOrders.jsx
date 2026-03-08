import { useEffect, useState } from "react";
import API from "../../api/axios";
import SellerSidebar from "./SellerSidebar";

function SellerOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const res = await API.get("/api/orders/");

      setOrders(res.data);

    } catch (error) {

      console.log("Orders error:", error);

    }

  };

  const cancelOrder = async (id) => {

    if (!window.confirm("Cancel this order?")) return;

    try {

      await API.patch(`/api/orders/${id}/`, {
        status: "cancelled"
      });

      alert("Order cancelled");

      fetchOrders(); // refresh list

    } catch (error) {

      console.log("Cancel error:", error.response?.data);

    }

  };

  return (

    <div className="flex">

      <SellerSidebar />

      <div className="p-6 flex-1">

        <h1 className="text-2xl font-bold mb-6">
          Seller Orders
        </h1>

        <table className="table w-full">

          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>
                <td colSpan="4" className="text-center">
                  No orders found
                </td>
              </tr>

            ) : (

              orders.map(order => (

                <tr key={order.id}>

                  <td>{order.id}</td>

                  <td>
                    {order.user?.username || "Customer"}
                  </td>

                  <td>

                    <span className="badge badge-warning">
                      {order.status}
                    </span>

                  </td>

                  <td>

                    {order.status !== "cancelled" && (

                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="btn btn-xs btn-error"
                      >
                        Cancel
                      </button>

                    )}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default SellerOrders;