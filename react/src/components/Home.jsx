import React from "react";
import Featured from "./Featured";
import Categories from "./Categories";
import Shoe from "./Shoe";

const Home = ({ data, addToCart }) => {
  // Helper function to group products by a specified attribute
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      const groupKey = currentValue.shoeDetails[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentValue);
      return result;
    }, {});
  };

  // Grouping the data
  const groupedByBrand = groupBy(data, "brand");
  const groupedByColor = groupBy(data, "color");
  const groupedBySize = groupBy(data, "size");
  const groupedByType = groupBy(data, "shoe_type");

  const renderGroupedProducts = (groupedData, groupTitle) => (
    <div className="category-section">
      <h3>{groupTitle}</h3>
      {Object.keys(groupedData).map((groupKey) => (
        <div key={groupKey}>
          <h4>{groupKey}</h4>
          <div className="row">
            {groupedData[groupKey].map((product) => (
              <Shoe key={product.shoe_id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="row">
        <div className="col">
          <Featured data={data} />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <Categories />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          {renderGroupedProducts(groupedByBrand, "Brand")}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          {renderGroupedProducts(groupedByColor, "Color")}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          {renderGroupedProducts(groupedBySize, "Size")}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          {renderGroupedProducts(groupedByType, "Type")}
        </div>
      </div>
    </>
  );
};

export default Home;
