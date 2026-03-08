import { useEffect, useState } from "react";
import API from "../../api/axios";
import SellerSidebar from "./SellerSidebar";

function SellerDashboard() {

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {

    // Fetch seller products
    API.get("/api/products/")
      .then(res => {
        setTotalProducts(res.data.length);
      })
      .catch(err => console.log(err));

    // Fetch orders
    API.get("/api/orders/")
      .then(res => {

        const orders = res.data;

        setTotalOrders(orders.length);

        const pending = orders.filter(
          order => order.status === "pending"
        );

        setPendingOrders(pending.length);

      })
      .catch(err => console.log(err));

  }, []);

  return (

    <div className="flex">

      <SellerSidebar />

      <div className="p-6 flex-1">

        <h1 className="text-3xl font-bold mb-6">
          Seller Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Total Products */}

          <div className="card bg-base-100 shadow p-6">

            <h2 className="text-lg font-semibold">
              Total Products
            </h2>

            <p className="text-3xl font-bold mt-2">
              {totalProducts}
            </p>

          </div>

          {/* Total Orders */}

          <div className="card bg-base-100 shadow p-6">

            <h2 className="text-lg font-semibold">
              Total Orders
            </h2>

            <p className="text-3xl font-bold mt-2">
              {totalOrders}
            </p>

          </div>

          {/* Pending Orders */}

          <div className="card bg-base-100 shadow p-6">

            <h2 className="text-lg font-semibold">
              Pending Orders
            </h2>

            <p className="text-3xl font-bold mt-2 text-warning">
              {pendingOrders}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default SellerDashboard;