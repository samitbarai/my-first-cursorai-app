import React from 'react';
import { useCart } from '../context/CartContext';
import { BiRupee, BiMinus, BiPlus } from 'react-icons/bi';
import './CartPage.css';

function CartPage() {
  const { cartItems, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add items to get started</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">
                <BiRupee />{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            
            <div className="cart-item-actions">
              <div className="quantity-counter">
                <button 
                  className="counter-button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <BiMinus />
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="counter-button"
                  onClick={() => updateQuantity(item.id, Math.min(item.quantity + 1, 10))}
                  disabled={item.quantity >= 10}
                >
                  <BiPlus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Total Amount</span>
          <span className="total-amount">
            <BiRupee />{getCartTotal().toFixed(2)}
          </span>
        </div>
        <button className="checkout-button">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage; 