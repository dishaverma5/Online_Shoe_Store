// components/Cart.jsx
import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container">
      <h2>My Cart</h2>
      <ul className="list-group mb-3">
        {cart.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">{item.name}</h6>
              <small className="text-muted">Quantity: {item.quantity}</small>
            </div>
            <span className="text-muted">${item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between">
        <span>Total (USD)</span>
        <strong>${calculateTotal()}</strong>
      </div>
      <Link to="/checkout" className="btn btn-primary mt-3">Proceed to Checkout</Link>
    </div>
  );
};

export default Cart;
