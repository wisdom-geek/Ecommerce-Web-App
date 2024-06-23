import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles.css'; // Ensure to import the CSS file

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product-details/${slug}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details: ', error);
      }
    };
    fetchProductDetails();

    // Fetch cart from local storage
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, [slug]);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    };
    // Update the cart local storage
    const updatedCart = cart.concat(cartItem);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    // Redirect to the cart page
    navigate("/cart");
  };

  const handleRemoveFromCart = (itemToRemove) => {
    const updatedCart = cart.filter((item) => item.id !== itemToRemove.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-card">
        <div className="product-image">
          <Link to={`/products/${product.slug}`} className="product-img-link">
            <img src={product.image} alt={product.name} className="product-img" />
          </Link>
        </div>
        <div className="product-info">
          <div className="product-items">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <div className="quantity-section">
            <label htmlFor="quantity" className="quantity-label">Quantity</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="quantity-input"
            />
          </div>
          <div className="button-section">
            <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
            {cart.some((item) => item.id === product.id) && (
              <button onClick={() => handleRemoveFromCart(product)} className="remove-from-cart-btn">Remove from Cart</button>
            )}
          </div>
        </div>
        </div>
      </div>
      <div className="vendor-info">
        <h3 className="vendor-info-title">Vendor Information</h3>
        <p className="vendor-info-details">Vendor: <Link to={`/vendor/${product.vendor?.id}`} className="vendor-link">{product.vendor?.name || 'Unknown Vendor'}</Link></p>
        <p className="vendor-info-details">Contact: {product.vendor?.contact_details || 'N/A'}</p>
      </div>
      <div className="shipping-info">
        <h3 className="shipping-info-title">Shipping Information</h3>
        <p className="shipping-policy">{`Shipping Policy: `}<a href={product.vendor?.shipping_policy} target="_blank" rel="noopener noreferrer" className="shipping-policy-link">{product.vendor?.shipping_policy ? 'Click Here' : 'N/A'}</a> for shipping policy</p>
        <p className="return-policy">{`Return Policy: `}<a href={product.vendor?.return_policy} target="_blank" rel="noopener noreferrer" className="return-policy-link">{product.vendor?.return_policy ? 'Click Here' : 'N/A'}</a> for return policy</p>
      </div>
      <div className="reviews">
        <h3 className="reviews-title">Customer Reviews</h3>
        {(product.reviews && product.reviews.length > 0) ? (
          product.reviews.map(review => (
            <div key={review.id} className="review-item">
              <p className="review-rating">Rating: {review.rating}</p>
              <p className="review-comment">Comment: {review.comment}</p>
            </div>
          ))
        ) : (
          <p className="no-reviews-msg">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;