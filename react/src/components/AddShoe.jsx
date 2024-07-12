import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";

const AddShoe = ({ shoe, addToCart }) => {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (user) {
      const cartItem = {
        userId: user.uid,
        shoeId: shoe._id,
        shoeName: shoe.name,
        shoeSize: shoe.size,
        shoeColor: shoe.color,
        quantity,
        addedTimestamp: new Date().toISOString(),
      };
      addToCart(cartItem);
    } else {
      alert("Please log in to add items to your cart.");
    }
  };

  return (
    <div className="row">
      <div className="col-4">
        <form onSubmit={handleAddToCart} className="p-3">
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShoe;
