import React, { useState } from "react";
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

  // State to handle the open/close state of each main category
  const [openCategories, setOpenCategories] = useState({
    BRAND: false,
    COLOR: false,
    SIZE: false,
    TYPE: false,
  });

  // State to handle the open/close state of each subcategory
  const [openSubCategories, setOpenSubCategories] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleSubCategory = (mainCategory, subCategory) => {
    setOpenSubCategories((prev) => ({
      ...prev,
      [`${mainCategory}-${subCategory}`]: !prev[`${mainCategory}-${subCategory}`],
    }));
  };

  const renderGroupedProducts = (groupedData, groupTitle) => (
    <div className="category-section" key={groupTitle}>
      <h3 onClick={() => toggleCategory(groupTitle)}>
        {groupTitle} <button className="btn btn-sm btn-outline-secondary">{openCategories[groupTitle] ? "Hide" : "Show"}</button>
      </h3>
      {openCategories[groupTitle] &&
        Object.keys(groupedData).map((groupKey) => (
          <div key={groupKey}>
            <h4 onClick={() => toggleSubCategory(groupTitle, groupKey)}>
              {groupKey} <button className="btn btn-sm btn-outline-secondary">{openSubCategories[`${groupTitle}-${groupKey}`] ? "Hide" : "Show"}</button>
            </h4>
            {openSubCategories[`${groupTitle}-${groupKey}`] && (
              <div className="row">
                {groupedData[groupKey].map((product) => (
                  <Shoe key={product.shoe_id} product={product} addToCart={addToCart} />
                ))}
              </div>
            )}
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
          {renderGroupedProducts(groupedByBrand, "BRAND")}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          {renderGroupedProducts(groupedByColor, "COLOR")}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          {renderGroupedProducts(groupedBySize, "SIZE")}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          {renderGroupedProducts(groupedByType, "TYPE")}
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Home;
