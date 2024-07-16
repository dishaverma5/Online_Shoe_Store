import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart }) => {
  const total = cart.reduce((acc, item) => acc + item.shoeDetails.price * item.quantity, 0);

  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ fontFamily: "Didot", color: "#004878" }}>
        <b>
          <u>C A R T - I T E M S</u>
        </b>
      </h3>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.shoeDetails.brand} - {item.shoeDetails.shoe_type} - {item.shoeDetails.color} - Size: {item.shoeDetails.size} - Quantity: {item.quantity} - Price: ${item.shoeDetails.price}
          </li>
        ))}
      </ul>
      <h4>Total: ${total.toFixed(2)}</h4>
      <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
    </div>
  );
};

export default Cart;
