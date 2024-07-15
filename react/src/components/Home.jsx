import React from "react";
import Shoe from "./Shoe";

const Home = ({ data, addToCart }) => {
  return (
    <div className="row">
      {data.map((product) => (
        <Shoe key={product.shoe_id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Home;
