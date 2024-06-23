import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles.css';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${slug}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details: ', error);
      }
    };
    fetchProductsDetails();

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
    setCart(updatedCart)
  }

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-details">
      {/* Product Image */}
      <div className="product-image">
        {/* Wrap the image with the Link component */}
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>

      {/* product details */}
      <div className="details-card">
        {/* Product Information */}
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          {/* Additional product information can be added here */}
          <button onClick={handleAddToCart}>Add to Cart</button>
          {cart.some((item) => item.id === product.id) && (
            <button onClick={() => handleRemoveFromCart(product)}>Remove from Cart</button>
          )}
        </div>
      </div>

      {/* Vendor Information */}
      <div className="vendor-info">
        <h3>Vendor Information</h3>
        <p>Vendor: <Link to={`/vendor/${product.vendor?.id}`}>{product.vendor?.name || 'Unknown Vendor'}</Link></p>
        <p>Contact: {product.vendor?.contact_details || 'N/A'}</p>
      </div>
      {/* Shipping information */}
      <div className="shipping-info">
        <h3>Shipping Information</h3>
        <p>Shipping Policy: <a href={product.vendor?.shipping_policy} target="_blank" rel="noopener noreferrer">{product.vendor?.shipping_policy ? 'Click Here' : 'N/A'}</a> for shipping policy</p>
        <p>Return Policy: <a href={product.vendor?.return_policy} target="_blank" rel="noopener noreferrer">{product.vendor?.return_policy ? 'Click Here' : 'N/A'}</a> for return policy</p>
      </div>

      {/* Reviews */}
      <div className="reviews">
        <h3>Customer Reviews</h3>
        {(product.reviews && product.reviews.length > 0) ? (
          product.reviews.map(review => (
            <div key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;