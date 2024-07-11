import React, { useState, useEffect } from "react";
import Shoe from "./components/Shoe";
import shoe_data from "./assets/shoe.json";
import promo_data from "./assets/promo.json";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Promotion from "./components/Promotion";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import About from "./components/About";
import Featured from "./components/Featured";
import AddShoe from "./components/AddShoe";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./hooks/AuthContext";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // State to store the current page number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SOCKS_API_URL}/${page}/10`
        );
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setData(json_response);
      } catch (error) {
        console.error("Error fetching shoes:", error);
      }
    };

    fetchData();
  }, [page]);

  const handleDelete = async (shoeId) => {
    try {
      // Make an API request to delete the shoe with the given shoeId
      const response = await fetch(
        `${import.meta.env.VITE_SOCKS_API_URL}/${shoeId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Shoe could not be deleted!");
      }
      // Update the state or fetch the updated data from the server
      const updatedData = data.filter((shoe) => shoe._id !== shoeId); // Remove the deleted shoe from the data array
      setData(updatedData); // Update the state with the updated data
    } catch (error) {
      console.error("Error deleting shoe:", error);
    }
  };

  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              The Step Up Shoe Shop
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link" to="/add">
                    Add Shoe
                  </Link>
                </li>
              </ul>
              <Search setData={setData} />
            </div>
          </div>
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div className="container-fluid">
            <div className="row">
              <Featured data={promo_data} />
              <hr />
              <AuthProvider>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <Home
                        data={data}
                        handleDelete={handleDelete}
                        page={page}
                        setPage={setPage}
                      />
                    }
                  />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/add"
                    element={
                      <RequireAuth>
                        <AddShoe />
                      </RequireAuth>
                    }
                  />
                  <Route path="/Login" element={<LoginForm />} />
                </Routes>
              </AuthProvider>
            </div>
          </div>
        </main>
        <footer
          className={
            import.meta.env.VITE_ENVIRONMENT === "development"
              ? "bg-yellow"
              : import.meta.env.VITE_ENVIRONMENT === "production"
              ? "bg-green"
              : ""
          }
        >
          <div>
            <strong>{import.meta.env.VITE_ENVIRONMENT.toUpperCase()}</strong>
          </div>
        </footer>
      </Router>
    </>
  );
}

export default App;
