import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../styles.css";

const CheckoutPage = ({ cart, setCart }) => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
  
    const calculateTotal = () => {
      if (cart.length === 0) {
        return 0; 
      }
      // Calculate total price
      return cart.reduce((total, item) => {
        // Parse the item price to ensure it's a valid number
        const itemPrice = parseFloat(item.price);
        // If item price is a valid number, add it to the total
        if (!isNaN(itemPrice)) {
          return total + itemPrice * item.quantity;
        }
        // If item price is not a valid number, ignore it and return the current total
        return total;
      }, 0);
    };
  
    const handleSubmit = (e) => {
      // Process the order and payment
      console.log("Order Details: ", {
        fullName,
        email,
        phone,
        country,
        state,
        paymentMethod,
        total: calculateTotal(),
      });
      setCart([]);
      localStorage.removeItem("cart");
  
      // Redirect to the appropriate payment method page
      if (paymentMethod === "mpesa") {
        navigate("/mpesa-payment");
      } else if (paymentMethod === "paypal") {
        navigate("/paypal-page");
      }
    };
  
    return (
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name: </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone: </label>
            <PhoneInput
              id="phone"
              country={"us"}
              value={phone}
              onChange={(value) => setPhone(value)}
              required
              inputProps={{ className: "form-input" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country" className="form-label">Country: </label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="state" className="form-label">State: </label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="payment-label">Payment Method: </label>
            <div className="payment-options">
              <div className="payment-option">
                <input
                  type="radio"
                  id="mpesa"
                  name="paymentMethod"
                  value="mpesa"
                  checked={paymentMethod === "mpesa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  className="payment-radio"
                />
                <label htmlFor="mpesa" className="payment-radio-label">Pay with Mpesa</label>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  className="payment-radio"
                />
                <label htmlFor="paypal" className="payment-radio-label">Pay with Paypal</label>
              </div>
            </div>
          </div>
          <div className="order-summary">
            <h3 className="order-summary-title">Order Summary</h3>
            <p className="order-total">Total: ${calculateTotal().toFixed(2)}</p>
          </div>
          <button type="submit" className="submit-btn">Place Order</button>
        </form>
      </div>
    );
  };
  
  export default CheckoutPage;