import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Importing CSS file for styling

function Navbar() {
  return (
    <nav>
      {/* Main application title, linked to the home page */}
      <Link to="/">Cafe App</Link>
      <ul>
        {/* Navigation links for different sections */}
        <li>
          <Link to="/drinks">Drinks</Link>
        </li>
        <li>
          <Link to="/snacks">Snacks</Link>
        </li>
        <li>
          <Link to="/new">Add Item</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
