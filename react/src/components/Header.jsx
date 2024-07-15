import React from "react";
import { Link } from "react-router-dom"; // If using React Router for navigation
import Search from "./Search"; // Adjust the import path based on your folder structure

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span>
              <b>STEP UP SHOES </b>
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  PRODUCTS
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  CART
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/checkout">
                  CHECKOUT
                </Link>
              </li>
            </ul>
          </div>
          <div className="ml-auto">
            <Search /> {/* Adjust the placement of Search based on your design */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
