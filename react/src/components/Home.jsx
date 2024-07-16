import React from "react";
import Featured from "./Featured";
import Categories from "./Categories";
import Shoe from "./Shoe";

const Home = ({ data, categories, addToCart }) => {
  // Helper function to group products by a specified attribute
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

  // Grouping the data
  const groupedByBrand = groupBy(data, "shoeDetails.brand");
  const groupedByColor = groupBy(data, "shoeDetails.color");
  const groupedBySize = groupBy(data, "shoeDetails.size");
  const groupedByType = groupBy(data, "shoeDetails.shoe_type");

  const renderGroupedProducts = (groupedData, groupTitle) => (
    <div className="row">
      <div className="col">
        <h3>Grouped by {groupTitle}</h3>
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
    </div>
  );

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
      {renderGroupedProducts(groupedByBrand, "Brand")}
      <hr />
      {renderGroupedProducts(groupedByColor, "Color")}
      <hr />
      {renderGroupedProducts(groupedBySize, "Size")}
      <hr />
      {renderGroupedProducts(groupedByType, "Type")}
    </>
  );
};

export default Home;
