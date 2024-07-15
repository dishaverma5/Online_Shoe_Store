import React, { useState, useEffect } from "react";
import Shoe from "./components/Shoe";
import shoe_data from "./assets/shoe.json";
import promo_data from "./assets/promo.json";
//import Header from "./components/Header";
import Search from "./components/Search";
import Promotion from "./components/Promotion";
import Home from "./components/Home";
import Categories from "./components/Categories";
import RequireAuth from "./components/RequireAuth";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import About from "./components/About";
import Featured from "./components/Featured";
import AddShoe from "./components/AddShoe";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./hooks/AuthContext";
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductDetails from './components/ProductDetails';
import OrderPlaced from "./components/OrderPlaced.jsx";

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/shoes`);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setData(json_response);
      } catch (error) {
        console.error('Error fetching shoes:', error);
      }
    };

    fetchData();
  }, [page]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Dummy data for categories
  const brands = ["Nike", "Adidas", "Puma"];
  const colors = ["Red", "Blue", "Black", "White"];
  const sizes = ["Small", "Medium", "Large"];

  return (
    <>
      <Router>
        <Header />
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <h2 style={{ fontFamily: "Didot", color: "#003f69" }}>
                <b>S T E P - U P</b>
              </h2>
            </Link>
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
                    <b>HOME</b>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    <b>ABOUT</b>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <b>MY CART</b>
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
              <div className="col">
                <Featured data={data} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Categories brands={brands} colors={colors} sizes={sizes} />
              </div>
            </div>
            <hr />
            <AuthProvider>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Home
                      data={data}
                      handleDelete={() => {}}
                      page={page}
                      setPage={setPage}
                      addToCart={addToCart}
                    />
                  }
                />
                <Route path="/about" element={<About />} />
                <Route
                  path="/add"
                  element={
                    <RequireAuth>
                      <AddShoe addToCart={addToCart} />
                    </RequireAuth>
                  }
                />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/cart" element={<Cart cart={cart} />} />
                <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
                <Route path="/product/:productId" element={<ProductDetails products={data} addToCart={addToCart} />} />
                <Route path="/order-placed" element={<OrderPlaced cart={cart} />} />
              </Routes>
            </AuthProvider>
          </div>
        </main>
        <footer>
          <div>
            <strong>{import.meta.env.VITE_ENVIRONMENT.toUpperCase()}</strong>
          </div>
        </footer>
      </Router>
    </>
  );
}

export default App;