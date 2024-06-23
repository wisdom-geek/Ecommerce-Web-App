import React from 'react';
import { Link } from 'react-router-dom';


const CartPage = ({cart, setCart}) => {
  const handleRemoveFromCart = (itemToRemove) =>{
    const updatedCart = cart.filter((item) => item.id !== itemToRemove.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  }
  const handleUpdateQuantity = (item, newQuantity) =>{
    const updatedCart = cart.map((cartItem) =>{
        if (cartItem.id === item.id){
            return {...cartItem, quantity: newQuantity};
        }
        return cartItem

    });
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    setCart(updatedCart);
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  return (
    <>
    <h1>Your Cart</h1>
    {cart.length === 0 ? (
        <p>Your Cart is empty</p>
    ):(
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item) =>(
                    <tr key={item.id}>
                        <td>
                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                            <input 
                             type='number'
                             min='1'
                             value={item.quantity}
                             onChange={(e) =>handleUpdateQuantity(item, parseInt(e.target.value))}                             
                            />                            
                        </td>
                        <td>
                            ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td>
                            <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>        
    )}
    <div>
        <h2>Total: ${calculateTotal().toFixed(2)}</h2>
        <button>Proceed to Checkout</button>
    </div>

    </>
  )
}

export default CartPage