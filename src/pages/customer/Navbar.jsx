
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const navLinks = (
    <>
      <li>
        <Link to="/customer-dashboard/products">Products</Link>
      </li>

      <li>
        <Link to="/customer-dashboard/cart">Cart</Link>
      </li>

      <li>
        <Link to="/customer-dashboard/orders">Orders</Link>
      </li>

      <li>
        <Link to="/customer-dashboard/profile">Profile</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">

      {/* LEFT SIDE */}
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

            {token ? (
              <li>
                <button onClick={logout} className="text-red-500">
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}

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

      {/* CENTER MENU (Desktop) */}
      <div className="navbar-center hidden lg:flex">

        <ul className="menu menu-horizontal px-1 gap-2">

          {navLinks}

        </ul>

      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end gap-2">

        {/* Cart Icon */}
        <Link
          to="/customer-dashboard/cart"
          className="btn btn-ghost btn-circle"
        >

          <div className="indicator">

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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m12-8l2 8"
              />

            </svg>

            <span className="badge badge-sm indicator-item">0</span>

          </div>

        </Link>

        {/* Desktop Logout/Login */}
        {token ? (
          <button
            onClick={logout}
            className="btn btn-sm btn-error hidden lg:inline-flex"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="btn btn-sm btn-primary hidden lg:inline-flex"
          >
            Login
          </Link>
        )}

      </div>

    </div>
  );
}

