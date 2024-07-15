import React, { useState } from "react";

const Search = ({ setData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/search`, {
        method: "POST",
        body: JSON.stringify({ searchTerm }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setData(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again."); // Set error state
      setData([]); // Optionally clear previous data on error
    }
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
      {error && <p className="text-danger">{error}</p>}
    </form>
  );
};

export default Search;
