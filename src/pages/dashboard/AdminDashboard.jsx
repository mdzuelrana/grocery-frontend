import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/api/products/");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await API.get("/api/customers/");
        setCustomers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCustomers();
  }, []);
  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await API.get("/api/orders/");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchOrders();
}, []);

const handleDelete = async (id) => {
  if (!window.confirm("Delete this product?")) return;

  try {
    await API.delete(`/api/products/${id}/`);

    setProducts(products.filter((p) => p.id !== id));
    alert("Product deleted");

    navigate("/admin");

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="flex min-h-screen bg-gray-100">

      

      {/* Main Content */}
      <main className="flex-1 p-6">

        {/* Top Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          {/* <button className="btn btn-sm btn-outline">
            Logout
          </button> */}
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="card bg-white shadow">
            <div className="card-body">
              <h2 className="text-gray-500">Products</h2>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
          </div>

          <div className="card bg-white shadow">
            <div className="card-body">
              <h2 className="text-gray-500">Orders</h2>
              <p className="text-2xl font-bold"> {orders.length} </p>
            </div>
          </div>

          <div className="card bg-white shadow">
            <div className="card-body">
              <h2 className="text-gray-500">Customers</h2>
              <p className="text-2xl font-bold">{customers.length}</p>
            </div>
          </div>

          <div className="card bg-white shadow">
            <div className="card-body">
              <h2 className="text-gray-500">Revenue</h2>
              <p className="text-2xl font-bold">$4,200</p>
            </div>
          </div>

        </div>

        {/* Product Table */}
        <div className="card bg-white shadow">
          <div className="card-body">

            <h2 className="text-xl font-semibold mb-4">
              Latest Products
            </h2>

            <div className="overflow-x-auto">

              <table className="table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>${p.price}</td>

                      <td>
                        <button
                          onClick={() => navigate(`/products/edit/${p.id}`)}
                          className="btn btn-xs btn-info mr-2"
                          >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(p.id)}
                          className="btn btn-xs btn-error"
                          >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;