import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
//MAKE IT MY CART
const AddShoe = () => {
  const { user } = useAuth();

  const [shoeData, setShoeData] = useState({
    userId: "",
    shoeDetails: {
      size: "Small", // Default set as 'Small'
      color: "",
      pattern: "",
      material: "",
      condition: "New", // Default set as 'New'
      forFoot: "Left", // Default set as 'Left'
    },
    additionalFeatures: {
      waterResistant: false,
      padded: false,
      antiBacterial: false,
    },
    addedTimestamp: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in shoeData.shoeDetails) {
      setShoeData({
        ...shoeData,
        shoeDetails: { ...shoeData.shoeDetails, [name]: value },
      });
    } else if (name in shoeData.additionalFeatures) {
      setShoeData({
        ...shoeData,
        additionalFeatures: {
          ...shoeData.additionalFeatures,
          [name]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setShoeData({
        ...shoeData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the current timestamp
    const submission = {
      ...shoeData,
      addedTimestamp: new Date().toISOString(),
      userId: user.uid,
    };

    try {
      // TODO: Make a POST request to the API to add the sshoe
      const response = await fetch(`${import.meta.env.VITE_SHOES_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // Handle post submission logic (like showing a success message)
    } catch (error) {
      console.error("Error posting data", error);
      // Handle errors here
    }
  };

  return (
    <div className="row">
      <div>
        {user ? (
          <h5>
            Welcome, {user.username}! Your UID is {user.uid}
          </h5>
        ) : (
          <h1>Please log in.</h1>
        )}
      </div>
      <div className="col-4">
        <form onSubmit={handleSubmit} className="p-3">
          <div className="form-group">
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              name="userId"
              value={user.uid}
              onChange={handleChange}
            />
          </div>
          {/* Additional form groups for  details */}
          <div className="form-group">
            <label htmlFor="size">Size</label>
            <select
              className="form-control"
              id="size"
              name="size"
              value={shoeData.shoeDetails.size}
              onChange={handleChange}
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
          {/* Shoe Details */}
          <div className="form-group">
            <label htmlFor="color">Color</label>
            <input
              type="text"
              className="form-control"
              id="color"
              name="color"
              value={shoeData.shoeDetails.color}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pattern">Pattern</label>
            <input
              type="text"
              className="form-control"
              id="pattern"
              name="pattern"
              value={shoeData.shoeDetails.pattern}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="material">Material</label>
            <input
              type="text"
              className="form-control"
              id="material"
              name="material"
              value={shoeData.shoesDetails.material}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="condition">Condition</label>
            <select
              className="form-control"
              id="condition"
              name="condition"
              value={shoeData.shoeDetails.condition}
              onChange={handleChange}
            >
              <option>Used</option>
              <option>New</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="forFoot">For Foot</label>
            <select
              className="form-control"
              id="forFoot"
              name="forFoot"
              value={shoeData.shoeDetails.forFoot}
              onChange={handleChange}
            >
              <option>Left</option>
              <option>Right</option>
              <option>Both</option>
            </select>
          </div>
          {/* Additional Features */}
          <div className="row">
            <div className="form-check col">
              <input
                className="form-check-input"
                type="checkbox"
                id="waterResistant"
                name="waterResistant"
                checked={shoeData.additionalFeatures.waterResistant}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="waterResistant">
                Water Resistant
              </label>
            </div>
            <div className="form-check col">
              <input
                className="form-check-input"
                type="checkbox"
                id="padded"
                name="padded"
                checked={shoeData.additionalFeatures.padded}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="padded">
                Padded
              </label>
            </div>
            <div className="form-check col">
              <input
                className="form-check-input"
                type="checkbox"
                id="antiBacterial"
                name="antiBacterial"
                checked={shoeData.additionalFeatures.antiBacterial}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="antiBacterial">
                Anti Bacterial
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShoe;
