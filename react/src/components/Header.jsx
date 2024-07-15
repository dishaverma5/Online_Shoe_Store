import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span>
              <b>STEP UP SHOES </b>
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
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
            <Search />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
