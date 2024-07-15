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
      <Header />
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div className="container-fluid">
          <div className="row">
            <Featured data={[]} />
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
        </div>
      </main>
      <footer>
        <div>
          <strong>{import.meta.env.VITE_ENVIRONMENT.toUpperCase()}</strong>
        </div>
      </footer>
    </Router>
  );
}

export default App;