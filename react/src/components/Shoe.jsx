import React from "react";

const Shoe = (props) => {
  const { shoeDetails, additionalFeatures, addedTimestamp, _id } = props.data;

  return (
    <div
      className="card card-background"
      style={{ flex: "1", minWidth: "300px", maxWidth: "45%" }}
    >
      <div className="card-body">
        <h5 className="card-title">Shoe Details</h5>
        <div className="card-text">Shoe Size: {shoeDetails?.size}</div>
        <div className="card-text">Shoe Color: {shoeDetails?.color}</div>
        <div className="card-text">Shoe Brand: {shoeDetails?.brand}</div>
        <div className="card-text">Shoe Material: {shoeDetails?.material}</div>
        <div className="card-text">Shoe Condition: {shoeDetails?.condition}</div>
      </div>
      <div className="card-body">
        <h5 className="card-title">Additional Features</h5>
        <div className="card-text">
          Has Laces: {additionalFeatures?.hasLaces ? "Yes" : "No"}
        </div>
        <div className="card-text">
          Is Athletic: {additionalFeatures?.isAthletic ? "Yes" : "No"}
        </div>
      </div>
      <div
        className="card-footer"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <small className="text-muted">Added: {new Date(addedTimestamp).toLocaleString()}</small>
      </div>
    </div>
  );
};

export default Shoe;
