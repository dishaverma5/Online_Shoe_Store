// components/Checkout.jsx
import React, { useState } from 'react';

const Checkout = ({ cart }) => {
  const [paymentInfo, setPaymentInfo] = useState('');
  const [shippingInfo, setShippingInfo] = useState('');

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart, paymentInfo, shippingInfo }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Order placed:', data);
      // Clear cart and form fields after successful order placement
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ fontFamily: "Didot", color: "#004878" }}>
        <b>
          <u>CHECKOUT</u>
        </b>
      </h3>
      <br />
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.brand} - Quantity: {item.quantity} - Price: ${item.price}
          </li>
        ))}
      </ul>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          display: "inline-block",
          padding: "10px 20px",
          marginTop: "10px",
        }}
      >
        <h4 style={{ margin: "0" }}>
          <b>TOTAL: ${total.toFixed(2)}</b>{" "}
          {/* show total amount rounded to 2 decimal places */}
        </h4>
      </div>
      <br /> <br />
      <div>
        <label>
          <b>PAYMENT INFORMATION: </b>
          <input
            type="text"
            value={paymentInfo}
            onChange={(e) => setPaymentInfo(e.target.value)}
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          <b>SHIPPING INFORMATION: </b>
          <input
            type="text"
            value={shippingInfo}
            onChange={(e) => setShippingInfo(e.target.value)}
          />
        </label>
      </div>
      <br />
      <button
        style={{
          backgroundColor: "#0d4d25",
          border: "3px solid #2478fe",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
          textDecoration: "none",
          transition: "background-color 0.3s",
        }}
        onClick={handleCheckout}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2478b7")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#0d4d25")}
      >
        Place Order
      </button>
      <br />
      <br />
    </div>
  );
};

export default Checkout;
