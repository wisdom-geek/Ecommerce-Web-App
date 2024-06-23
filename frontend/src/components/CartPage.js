import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const CartPage = ({ cart, setCart }) => {
    const handleRemoveFromCart = (itemToRemove) => {
      const updatedCart = cart.filter((item) => item.id !== itemToRemove.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  
    const handleUpdateQuantity = (item, newQuantity) => {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  
    const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  
    return (
      <>
        <h1 className="cart-title">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="cart-empty">Your Cart is empty</p>
        ) : (
          <table className="cart-table">
            <thead className="cart-thead">
              <tr className="cart-header-row">
                <th className="cart-header-cell">Product</th>
                <th className="cart-header-cell">Price</th>
                <th className="cart-header-cell">Quantity</th>
                <th className="cart-header-cell">Total</th>
                <th className="cart-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="cart-tbody">
              {cart.map((item) => (
                <tr key={item.id} className="cart-row">
                  <td className="cart-cell">
                    <Link to={`/product/${item.slug}`} className="cart-link">{item.name}</Link>
                  </td>
                  <td className="cart-cell">${Number(item.price).toFixed(2)}</td>
                  <td className="cart-cell">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item, parseInt(e.target.value))}
                      className="cart-quantity-input"
                    />
                  </td>
                  <td className="cart-cell">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="cart-cell">
                    <button onClick={() => handleRemoveFromCart(item)} className="remove-btn">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="totals">
          <h2 className="total-amount">Total: ${calculateTotal().toFixed(2)}</h2>
          <button className="proceed-btn">Proceed to Checkout</button>
        </div>
      </>
    );
  }
  
  export default CartPage;