import React from "react";
import Featured from "./Featured";
import Categories from "./Categories";
import Shoe from "./Shoe";

const Home = ({ data, categories, addToCart }) => {
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

  const groupedByBrand = groupBy(data, "shoeDetails.brand");
  const groupedByColor = groupBy(data, "shoeDetails.color");
  const groupedBySize = groupBy(data, "shoeDetails.size");
  const groupedByType = groupBy(data, "shoeDetails.shoe_type");

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
      <hr />
      <div className="row">
        <div className="col">
          <h3>Grouped by Brand</h3>
          {Object.keys(groupedByBrand).map((brand) => (
            <div key={brand}>
              <h4>{brand}</h4>
              <div className="row">
                {groupedByBrand[brand].map((product) => (
                  <Shoe key={product.shoe_id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h3>Grouped by Color</h3>
          {Object.keys(groupedByColor).map((color) => (
            <div key={color}>
              <h4>{color}</h4>
              <div className="row">
                {groupedByColor[color].map((product) => (
                  <Shoe key={product.shoe_id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h3>Grouped by Size</h3>
          {Object.keys(groupedBySize).map((size) => (
            <div key={size}>
              <h4>{size}</h4>
              <div className="row">
                {groupedBySize[size].map((product) => (
                  <Shoe key={product.shoe_id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h3>Grouped by Type</h3>
          {Object.keys(groupedByType).map((type) => (
            <div key={type}>
              <h4>{type}</h4>
              <div className="row">
                {groupedByType[type].map((product) => (
                  <Shoe key={product.shoe_id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
