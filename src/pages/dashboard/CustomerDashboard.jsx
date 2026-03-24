
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";

export default function CustomerDashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/customer-dashboard/products"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Products
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/customer-dashboard/cart"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Cart
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/customer-dashboard/orders"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Orders
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/customer-dashboard/payments"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Payment History
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/customer-dashboard/wishlist"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Wishlist
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/customer-dashboard/profile"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Profile
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 lg:px-8">

        {/* LEFT */}
        <div className="navbar-start">

          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">

            <label tabIndex={0} className="btn btn-ghost btn-circle">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />

              </svg>

            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[100]"
            >
              {navLinks}

              <div className="divider my-1"></div>

              <li>
                <button onClick={logout} className="text-red-500">
                  Logout
                </button>
              </li>

            </ul>

          </div>

          {/* Logo */}
          <Link
            to="/customer-dashboard"
            className="text-xl md:text-2xl font-bold ml-2 text-primary"
          >
            Grocery Store
          </Link>

        </div>

        {/* CENTER (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">

          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks}
          </ul>

        </div>

        {/* RIGHT */}
        <div className="navbar-end">

          <button
            onClick={logout}
            className="btn btn-sm btn-error hidden lg:inline-flex"
          >
            Logout
          </button>

        </div>

      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6">

        <Outlet />

      </div>

    </div>
  );
}

