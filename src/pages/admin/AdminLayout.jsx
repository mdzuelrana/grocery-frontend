
import { Link, Outlet, useNavigate, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

function AdminLayout() {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/admin" className={({isActive}) => isActive ? "font-semibold text-primary" : ""}>
          Dashboard
        </NavLink>
      </li>

      <li>
        <NavLink to="/admin/products" className={({isActive}) => isActive ? "font-semibold text-primary" : ""}>
          Products
        </NavLink>
      </li>

      <li>
        <NavLink to="/admin/customers" className={({isActive}) => isActive ? "font-semibold text-primary" : ""}>
          Customers
        </NavLink>
      </li>

      <li>
        <NavLink to="/admin/reviews" className={({isActive}) => isActive ? "font-semibold text-primary" : ""}>
          Reviews
        </NavLink>
      </li>

      <li>
        <NavLink to="/admin/profile" className={({isActive}) => isActive ? "font-semibold text-primary" : ""}>
          Profile
        </NavLink>
      </li>

      <li>
        <button onClick={handleLogout} className="text-red-500">
          Logout
        </button>
      </li>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Navbar */}
      <div className="navbar bg-base-100 shadow-md lg:hidden">

        <div className="flex-none">

          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setOpen(!open)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">

              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />

            </svg>
          </button>

        </div>

        <div className="flex-1">
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>

      </div>

      <div className="flex">

        {/* Sidebar */}
        <aside
          className={`bg-base-200 w-64 p-6 space-y-4 fixed lg:static min-h-screen transform 
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-200`}
        >

          <h2 className="text-2xl font-bold mb-6 hidden lg:block">
            Admin Panel
          </h2>

          <ul className="menu space-y-2">
            {navLinks}
          </ul>

        </aside>

        {/* Overlay (mobile) */}
        {open && (
          <div
            className="fixed inset-0 bg-black opacity-30 lg:hidden"
            onClick={() => setOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:ml-0">

          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>

        </main>

      </div>

    </div>
  );
}

export default AdminLayout;
