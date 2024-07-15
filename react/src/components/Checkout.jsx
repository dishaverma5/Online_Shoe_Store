// components/Checkout.jsx
import React, { useState } from "react";

const Checkout = ({ cart }) => {
  const [paymentInfo, setPaymentInfo] = useState("");
  const [shippingInfo, setShippingInfo] = useState("");

  const handleCheckout = () => {
    // Handle the checkout process here (e.g., send data to the server)
    console.log("Payment Info:", paymentInfo);
    console.log("Shipping Info:", shippingInfo);
    console.log("Cart Items:", cart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
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
      <form onSubmit={handleCheckout}>
        <div className="mb-3">
          <label htmlFor="paymentInfo" className="form-label">Payment Information</label>
          <input type="text" className="form-control" id="paymentInfo" value={paymentInfo} onChange={(e) => setPaymentInfo(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="shippingInfo" className="form-label">Shipping Information</label>
          <input type="text" className="form-control" id="shippingInfo" value={shippingInfo} onChange={(e) => setShippingInfo(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
