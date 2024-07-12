import React, { useState } from "react";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/search`, {  // Using VITE_API_URL here
      method: "POST",
      body: JSON.stringify({ searchTerm }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data
        props.setData(data);
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="SEARCH"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
