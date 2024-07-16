import React from "react";
import { useLocation, Link } from "react-router-dom";
import Promotion from "./Promotion";

const Featured = ({ data }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  if (!isHomePage) {
    return null;
  }

  // Filter and shuffle the items based on the criteria
  const filteredItems = data.filter(
    (item) =>
      item.additionalFeatures.isPopular &&
      item.additionalFeatures.inStock &&
      item.additionalFeatures.onSale
  );

  // Shuffle the array
  const shuffledItems = filteredItems.sort(() => 0.5 - Math.random());

  // Get the first 6 items from the shuffled array
  const featuredItems = shuffledItems.slice(0, 6);

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
        className="card-container d-flex flex-row justify-content-start flex-wrap"
        style={{ gap: "20px", padding: "20px" }}
      >
        {featuredItems.map((promo) => (
          <div key={promo.shoe_id} className="card" style={{ flex: "1 1 calc(33.33% - 20px)", maxWidth: "calc(33.33% - 20px)" }}>
            <div className="card-body">
              <h5 className="card-title">{promo.shoeDetails.brand}</h5>
              <p className="card-text">Type: {promo.shoeDetails.shoe_type}</p>
              <p className="card-text">Color: {promo.shoeDetails.color}</p>
              <p className="card-text">Size: {promo.shoeDetails.size}</p>
              <p className="card-text">Price: ${promo.shoeDetails.price}</p>
              <Link to={`/product/${promo.shoe_id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Featured;
