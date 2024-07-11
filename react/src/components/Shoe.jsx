import React from "react";

const Shoe = (props) => {
  return (
    <div
      className="card card-background"
      style={{ flex: "1", minWidth: "300px", maxWidth: "45%" }}
    >
      
      <div className="card-body">
        <h5 className="card-title">ADDITIONAL FEATURES</h5>
        <div className="card-text">
          Has Laces:{" "}
          {props.data.additionalFeatures.hasLaces ? "Yes" : "No"}
        </div>
        <div className="card-text">
          Is Athletic: {props.data.additionalFeatures.isAthletic ? "Yes" : "No"}
        </div>
      </div>
      <div
        className="card-footer"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <small className="text-muted">Added: {props.data.addedTimestamp}</small>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => props.handleDelete(props.data._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Shoe;
