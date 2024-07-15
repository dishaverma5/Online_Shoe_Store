import React, { useState, useEffect } from "react";
import Shoe from "./components/Shoe";
import shoe_data from "./assets/shoe.json";
import promo_data from "./assets/promo.json";
import Header from "./components/Header";
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

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
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
                <Route path="/cart" element={<Cart cart={cart} />} />
                <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
                <Route path="/product/:productId" element={<ProductDetails products={data} addToCart={addToCart} />} />
                <Route path="/order-placed" element={<OrderPlaced cart={cart} />} />
                <Route path="/add" element={<AddShoe addToCart={addToCart} />} />
                <Route path="/login" element={<LoginForm />} />
              </Routes>
            </main>
          </div>
        </div>
        <footer>
          <div>
            <strong>{import.meta.env.VITE_ENVIRONMENT.toUpperCase()}</strong>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;