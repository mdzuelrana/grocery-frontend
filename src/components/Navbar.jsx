
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  

  

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Products
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/aboutt"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          About
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Login
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Register
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 lg:px-10">

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
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
          >
            {navLinks}
          </ul>

        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-primary ml-2"
        >
          GroceryShop
        </Link>

      </div>

      {/* CENTER MENU (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">
          {navLinks}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end">

        {/* Cart */}
        <Link to="/cart" className="btn btn-ghost btn-circle">
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

      </div>

    </div>
  );
};

export default Navbar;

