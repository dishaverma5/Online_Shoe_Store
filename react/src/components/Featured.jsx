import React from "react";
import { useLocation } from "react-router-dom";
import Promotion from "./Promotion";

const Featured = (props) => {
  const location = useLocation();

  // Check if the current location is the Home page
  const isHomePage = location.pathname === "/";

  // Render the component only on the Home page
  if (!isHomePage) {
    return null; // Return null if not on the Home page
  }

  return (
    <>
      <div>
        <br />
        <h6 style={{ color: "#00365a" }}>
          <b>Step Up Shoes: Where Style Meets Durability</b>
        </h6>
        Explore our curated selection of stylish, durable footwear for every
        occasion. From casual comfort to chic elegance and sporty durability,
        find your perfect pair today and step into timeless style and unmatched
        quality. <br />
        <br />
      </div>

      <div style={{ textAlign: "center" }}>
        <h6
          style={{
            color: "#00365a",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <b>FEATURED PRODUCTS</b>
        </h6>
      </div>

      <div
        className="card-container d-flex flex-row justify-content-start"
        style={{ gap: "20px", padding: "20px" }}
      >
        {props.data.map((promo) => (
          <Promotion key={promo.id} data={promo} />
        ))}
      </div>
    </>
  );
};

export default Featured;
