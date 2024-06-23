import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import SearchResultPage from './components/SearchResultsPage';
import HomePage from './components/HomePage';
import ProductDetails from './components/ProductDetails';
import { useState} from 'react';
import CategoryPage from './components/CategoryPage';
import CartPage from './components/CartPage';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState(
    localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart")) : []
  );



  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  
  return (
    <div>
      {/* Navigation bar start */}
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            My Shop <i className="fa-sharp fa-solid fa-cart-plus"></i>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">About Us</Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/categories/accessories">Accessories</Link></li>
                  <li><Link className="dropdown-item" to="/categories/computers">Computers</Link></li>
                  <li><Link className="dropdown-item" to="/categories/tvs">Tvs</Link></li>
                  <li><Link className="dropdown-item" to="/categories/phones">Phones</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/">My Account</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to="/cart">
                  Cart ({cart.length})
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      {/* Nav bar ends */}
      {/* Routes */}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/products/:slug" element={<ProductDetails />} /> 
        <Route exact path="/search" element={<SearchResultPage />} />
        <Route exact path="/categories/:slug" element={<CategoryPage />} />
        <Route exact path="/cart" element={<CartPage cart={cart} setCart={setCart}/>} />
      </Routes>
    </div>
  );
}

export default App;