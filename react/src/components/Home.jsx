import React from "react";
import Featured from "./Featured";
import Categories from "./Categories";
import Shoe from "./Shoe";

const Home = ({ data, categories, page, setPage, addToCart }) => {
  return (
    <>
      <div className="row">
        <div className="col">
          <Featured data={data} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Categories 
            brands={categories.brands} 
            colors={categories.colors} 
            sizes={categories.sizes} 
          />
        </div>
      </div>
      <div className="row">
        {data.map((product) => (
          <Shoe key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </>
  );
};

export default Home;
