import { useEffect, useState } from "react";
import API from "../api/axios";

function Profile() {

  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [passwordData, setPasswordData] = useState({
    new_password: "",
    re_new_password: ""
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: ""
  });

  // Fetch profile
  const fetchProfile = async () => {
    const res = await API.get("/api/profile/");
    setProfile(res.data);
    setFormData(res.data);
  };

  // Fetch orders
  const fetchOrders = async () => {
    const res = await API.get("/api/orders/");
    setOrders(res.data);
  };

  // Fetch wishlist
  const fetchWishlist = async () => {
    const res = await API.get("/api/wishlist/");
    setWishlist(res.data);
  };

  useEffect(() => {
    fetchProfile();
    fetchOrders();
    fetchWishlist();
  }, []);

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    await API.put("/api/profile/", formData);

    alert("Profile updated successfully");
  };

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    await API.post("/auth/users/set_password/", passwordData);

    alert("Password updated successfully");
  };

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Profile Info */}
        <div className="card bg-base-100 shadow">

          <div className="card-body">

            <h2 className="card-title">
              Profile Information
            </h2>

            <form onSubmit={handleUpdate} className="space-y-3">

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Username"
                value={formData.username || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value
                  })
                }
              />

              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value
                  })
                }
              />

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Phone"
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value
                  })
                }
              />

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Address"
                value={formData.address || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value
                  })
                }
              />

              <button className="btn btn-primary w-full">
                Update Profile
              </button>

            </form>

          </div>

        </div>

        {/* Change Password */}
        <div className="card bg-base-100 shadow">

          <div className="card-body">

            <h2 className="card-title">
              Change Password
            </h2>

            <form
              onSubmit={handlePasswordChange}
              className="space-y-3"
            >

              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="New Password"
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    new_password: e.target.value
                  })
                }
              />

              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Confirm Password"
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    re_new_password: e.target.value
                  })
                }
              />

              <button className="btn btn-secondary w-full">
                Change Password
              </button>

            </form>

          </div>

        </div>

      </div>

      {/* Purchase History */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          Purchase History
        </h2>

        {orders.map(order => (

          <div
            key={order.id}
            className="p-4 border rounded mb-3"
          >

            <p>
              Order ID: <b>{order.id}</b>
            </p>

            <p>Total: ${order.total_amount}</p>

            <p>Status: {order.status}</p>

          </div>

        ))}

      </div>

      {/* Wishlist */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          Wishlist
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          {wishlist.map(item => (

            <div
              key={item.id}
              className="card bg-base-100 shadow"
            >

              <div className="card-body">

                <h3 className="font-bold">
                  {item.product.name}
                </h3>

                <p>
                  ${item.product.price}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Profile;