import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Logo</Link>

      <NavLink to="/products/new">New</NavLink>
      <NavLink to="/products/men">Men</NavLink>
      <NavLink to="/products/women">Women</NavLink>
      <NavLink to="/products/kids">Kids</NavLink>
      <NavLink to="/sports">Sports</NavLink>

      <input type="text" placeholder="Search" />
    </nav>
  );
}

export default Navbar;
