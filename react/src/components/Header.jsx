import React from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "./components/Search";
import { AuthProvider } from "./hooks/AuthContext";

const Header = () => {
  const location = useLocation();

  // Determine if we are on the Home page
  const isHomePage = location.pathname === "/";

  return (
    <nav className={`navbar navbar-expand-lg bg-body-tertiary ${isHomePage ? "full-width" : ""}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h2 style={{ fontFamily: "Didot", color: "#003f69" }}>
            <b>S T E P - U P</b>
          </h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <b>HOME</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <b>ABOUT</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <b>MY CART</b>
              </Link>
            </li>
          </ul>
          <Search />
        </div>
      </div>
    </nav>
  );
};

export default Header;
