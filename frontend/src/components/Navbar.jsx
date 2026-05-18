import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/nike-logo.svg";

function Navbar() {
  return (
    <nav className="mx-auto flex w-full max-w-8xl flex-wrap items-center gap-6 px-6 py-5 md:gap-8 md:px-10 lg:px-14">
      <Link to="/" className="inline-flex items-center">
        <img src={logo} alt="Nike" className="w-auto" />
      </Link>

      <div className="order-3 w-full md:order-2 md:flex md:w-auto md:flex-1 md:justify-center">
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
          <NavLink
            to="/products/new"
            className={({ isActive }) =>
              `transition decoration-slate-900 underline-offset-8 ${
                isActive
                  ? "text-slate-900 underline"
                  : "text-slate-600 hover:text-slate-900 hover:underline"
              }`
            }
          >
            New
          </NavLink>
          <NavLink
            to="/products/men"
            className={({ isActive }) =>
              `transition decoration-slate-900 underline-offset-8 ${
                isActive
                  ? "text-slate-900 underline"
                  : "text-slate-600 hover:text-slate-900 hover:underline"
              }`
            }
          >
            Men
          </NavLink>
          <NavLink
            to="/products/women"
            className={({ isActive }) =>
              `transition decoration-slate-900 underline-offset-8 ${
                isActive
                  ? "text-slate-900 underline"
                  : "text-slate-600 hover:text-slate-900 hover:underline"
              }`
            }
          >
            Women
          </NavLink>
          <NavLink
            to="/products/kids"
            className={({ isActive }) =>
              `transition decoration-slate-900 underline-offset-8 ${
                isActive
                  ? "text-slate-900 underline"
                  : "text-slate-600 hover:text-slate-900 hover:underline"
              }`
            }
          >
            Kids
          </NavLink>
          <NavLink
            to="/sports"
            className={({ isActive }) =>
              `transition decoration-slate-900 underline-offset-8 ${
                isActive
                  ? "text-slate-900 underline"
                  : "text-slate-600 hover:text-slate-900 hover:underline"
              }`
            }
          >
            Sports
          </NavLink>
        </div>
      </div>

      <div className="order-2 w-full md:order-3 md:w-auto md:ml-auto">
        <input
          type="text"
          placeholder="Search"
          className="w-full min-w-0 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition duration-150 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 md:w-80"
        />
      </div>
    </nav>
  );
}

export default Navbar;
