
import { Link, Outlet, useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

function SellerDashboard() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/seller/dashboard"
          className={({isActive}) => isActive ? "font-semibold text-primary" : ""}
        >
          Dashboard
        </NavLink>
      </li>

      <li>
        <NavLink to="/seller/products"
          className={({isActive}) => isActive ? "font-semibold text-primary" : ""}
        >
          My Products
        </NavLink>
      </li>

      <li>
        <NavLink to="/seller/products/add"
          className={({isActive}) => isActive ? "font-semibold text-primary" : ""}
        >
          Add Product
        </NavLink>
      </li>

      <li>
        <NavLink to="/seller/orders"
          className={({isActive}) => isActive ? "font-semibold text-primary" : ""}
        >
          Orders
        </NavLink>
      </li>
      <li>
        <NavLink to="/seller/profile"
          className={({isActive}) => isActive ? "font-semibold text-primary" : ""}
        >
          Profile
        </NavLink>
      </li>

      <li className="mt-4">
        <button
          onClick={handleLogout}
          className="btn btn-error btn-sm w-full"
        >
          Logout
        </button>
      </li>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Mobile Navbar */}
      <div className="navbar bg-base-100 shadow lg:hidden">

        <div className="flex-none">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setOpen(!open)}
          >

            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">

              <path strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"/>

            </svg>

          </button>
        </div>

        <div className="flex-1">
          <h1 className="text-lg font-bold">Seller Panel</h1>
        </div>

      </div>

      <div className="flex">

        {/* Sidebar */}
        <aside
          className={`bg-base-200 w-64 min-h-screen p-6 fixed lg:static transform
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-200`}
        >

          <h2 className="text-xl font-bold mb-6 hidden lg:block">
            Seller Panel
          </h2>

          <ul className="menu space-y-2">
            {navLinks}
          </ul>

        </aside>

        {/* Mobile Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black opacity-30 lg:hidden"
            onClick={() => setOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">

          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>

        </main>

      </div>

    </div>
  );
}

export default SellerDashboard;

