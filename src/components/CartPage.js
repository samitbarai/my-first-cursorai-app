import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BiRupee } from 'react-icons/bi';
import './CartPage.css';

function CartPage() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Cart</h1>
        <div className="total-amount">
          <span>Total:</span>
          <span className="amount">
            <BiRupee />{total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">
                <BiRupee />{(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="cart-item-quantity">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-actions">
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            Add more items
          </button>
          <button className="checkout-button">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage; 