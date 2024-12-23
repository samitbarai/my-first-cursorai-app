import React from 'react';

function MenuItem({ item }) {
  return (
    <div className="menu-card">
      <div className="menu-card-content">
        <div className="menu-card-header">
          {item.isVeg && (
            <span className="veg-indicator">
              <span className="veg-inner" />
            </span>
          )}
          <h3 className="item-name">{item.name}</h3>
          <p className="item-price">₹{item.price.toFixed(2)}</p>
        </div>
        
        <div className="menu-card-details">
          {item.rating && (
            <div className="rating">
              <span className="rating-score">{item.rating}</span>
              <span className="review-count">({item.reviews})</span>
            </div>
          )}
          <p className="item-description">{item.description}</p>
        </div>
        
        <div className="menu-card-footer">
          <p className="customizable">Customisable</p>
        </div>
      </div>

      <div className="menu-card-image">
        <img
          src={item.image}
          alt={item.name}
          className="item-image"
        />
        <button className="add-button">ADD</button>
      </div>
    </div>
  );
}

export default MenuItem;