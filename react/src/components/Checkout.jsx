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
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ fontFamily: 'Didot', color: '#004878' }}>
        <b><u>CHECKOUT</u></b>
      </h3>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.brand} - Quantity: {item.quantity} - Price: ${item.price}
          </li>
        ))}
      </ul>
      <h4>Total: ${total}</h4>
      <div>
        <label>
          Payment Info:
          <input
            type="text"
            value={paymentInfo}
            onChange={(e) => setPaymentInfo(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Shipping Info:
          <input
            type="text"
            value={shippingInfo}
            onChange={(e) => setShippingInfo(e.target.value)}
          />
        </label>
      </div>
      <button className="btn btn-primary" onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default Checkout;
