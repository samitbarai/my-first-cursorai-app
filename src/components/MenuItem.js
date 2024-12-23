import React from 'react';
import { BsCircleFill } from 'react-icons/bs';  // For veg indicator
import { AiFillStar } from 'react-icons/ai';    // For rating star
import { BiRupee, BiMinus, BiPlus } from 'react-icons/bi';       // For rupee symbol
import { MdEdit } from 'react-icons/md';        // For customizable indicator
import { useCart } from '../context/CartContext';

/**
 * MenuItem Component
 * Renders a single menu item card with details like name, price, rating, and image
 * @param {Object} item - The menu item data containing all item details
 * @param {String} searchQuery - The search query used to highlight text
 */
function MenuItem({ item, searchQuery }) {
  const { cartItems, addToCart } = useCart();
  const cartItem = cartItems.find(i => i.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleIncrement = () => {
    addToCart(item, Math.min(quantity + 1, 10));
  };

  const handleDecrement = () => {
    addToCart(item, Math.max(0, quantity - 1));
  };

  const highlightText = (text) => {
    if (!searchQuery) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="menu-card">
      {/* Left section - Content */}
      <div className="menu-card-content">
        {/* Header: Veg indicator, name and price */}
        <div className="menu-card-header">
          {item.isVeg && (
            <span className="veg-indicator">
              <BsCircleFill className="veg-inner" />
            </span>
          )}
          <h3 className="item-name">{highlightText(item.name)}</h3>
          <p className="item-price">
            <BiRupee className="rupee-icon" />{item.price.toFixed(2)}
          </p>
        </div>
        
        {/* Details: Rating and description */}
        <div className="menu-card-details">
          {item.rating && (
            <div className="rating">
              <span className="rating-score">
                <AiFillStar className="star-icon" />
                {item.rating}
              </span>
              <span className="review-count">({item.reviews})</span>
            </div>
          )}
          <p className="item-description">{highlightText(item.description)}</p>
        </div>
        
        {/* Footer: Customization indicator */}
        <div className="menu-card-footer">
          <p className="customizable">
            <MdEdit className="edit-icon" />
            Customisable
          </p>
        </div>
      </div>

      {/* Right section - Image and Add button */}
      <div className="menu-card-image">
        <img
          src={item.image}
          alt={item.name}
          className="item-image"
        />
        {quantity === 0 ? (
          <button 
            className="add-button"
            onClick={handleIncrement}
          >
            ADD
          </button>
        ) : (
          <div className="quantity-counter">
            <button 
              className="counter-button"
              onClick={handleDecrement}
            >
              <BiMinus />
            </button>
            <span className="quantity">{quantity}</span>
            <button 
              className="counter-button"
              onClick={handleIncrement}
              disabled={quantity >= 10}
            >
              <BiPlus />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuItem;