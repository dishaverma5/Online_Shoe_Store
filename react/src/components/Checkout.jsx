import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css'; // Import the CSS file

const Checkout = ({ cart, setCart }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e, setFunction) => {
    const { name, value } = e.target;
    setFunction((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderDetails = {
      cart,
      total: cart.reduce((total, item) => total + item.shoeDetails.price * item.quantity, 0),
      paymentInfo,
      shippingInfo,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error('Error creating order');
      }

      const result = await response.json();
      console.log('Order created:', result);

      setCart([]);
      navigate('/order-placed');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.shoeDetails.price * item.quantity, 0);

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">CHECKOUT</h2>
      <div className="checkout-cart">
        <h3>Cart Items:</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.shoeDetails.brand} - {item.shoeDetails.shoe_type} - {item.shoeDetails.color} - Size: {item.shoeDetails.size} - Quantity: {item.quantity} - Price: ${item.shoeDetails.price}
            </li>
          ))}
        </ul>
        <h4>Total: ${total.toFixed(2)}</h4>
      </div>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="checkout-section">
          <div className="payment-info">
            <h3>PAYMENT INFORMATION</h3>
            <div>
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={(e) => handleInputChange(e, setPaymentInfo)}
                required
              />
            </div>
            <div>
              <label htmlFor="expirationDate">Expiration Date:</label>
              <input
                type="text"
                id="expirationDate"
                name="expirationDate"
                placeholder="MM/YY"
                value={paymentInfo.expirationDate}
                onChange={(e) => handleInputChange(e, setPaymentInfo)}
                required
              />
            </div>
            <div>
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={(e) => handleInputChange(e, setPaymentInfo)}
                required
              />
            </div>
          </div>
        </div>
        <div className="checkout-section">
          <div className="shipping-info">
            <h3>SHIPPING INFORMATION</h3>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={shippingInfo.name}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                required
              />
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingInfo.city}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                required
              />
            </div>
            <div>
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={shippingInfo.state}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                required
              />
            </div>
            <div>
              <label htmlFor="zip">Zip Code:</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={shippingInfo.zip}
                onChange={(e) => handleInputChange(e, setShippingInfo)}
                required
              />
            </div>
          </div>
        </div>
        <div className="checkout-button">
          <button type="submit">Place Order</button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
