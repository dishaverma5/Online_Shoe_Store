// components/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart }) => (
  <div style={{ textAlign: 'center' }}>
    <h3 style={{ fontFamily: 'Didot', color: '#004878' }}>
      <b><u>C A R T - I T E M S</u></b>
    </h3>
    <ul>
      {cart.map((item, index) => (
        <li key={index}>
          {item.brand} - Quantity: {item.quantity}
        </li>
      ))}
    </ul>
    <Link to="/checkout">
      <button className="btn btn-primary">Proceed to Checkout</button>
    </Link>
  </div>
);

export default Cart;
