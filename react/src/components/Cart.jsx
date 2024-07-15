// components/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart }) => (
  <div style={{ textAlign: "center" }}>
    <h3 style={{ fontFamily: "Didot", color: "#004878" }}>
      <b>
        <u>C A R T - I T E M S</u>
      </b>
    </h3>
    <ul>
      {cart.map((item, index) => (
        <li key={index}>
          {item.brand} - Quantity: {item.quantity}
        </li>
      ))}
    </ul>
    <Link to="/checkout">
      <br />
      <br />
      <button
        style={{
          backgroundColor: "#0d4d25",
          border: "2px solid #2478fe",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
          textDecoration: "none",
          transition: "background-color 0.3s", // Smooth transition effect
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2478b7")} // Change color on hover
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#0d4d25")} // Revert color on mouse leave
      >
         Proceed to Checkout 
      </button>
    </Link>
  </div>
);

export default Cart;
