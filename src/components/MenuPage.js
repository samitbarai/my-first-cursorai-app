import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuPage.css';
import MenuItem from './MenuItem';
import menuData from '../data/menuItems.json';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function MenuPage() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { menuItems } = menuData;
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredMenuItems = menuItems.filter((item) => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const menuItemsRef = useRef(null);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <h1 className="restaurant-name">The Belgian Waffle Co.</h1>
          <p className="delivery-time">40-45 mins</p>
        </div>
        <div className="header-actions">
          <div className="search-container">
            {isSearchVisible && (
              <input
                type="text"
                className="search-input"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
            )}
            <button 
              className="search-button"
              onClick={() => {
                setIsSearchVisible(!isSearchVisible);
                if (!isSearchVisible) {
                  setSearchQuery('');
                }
              }}
            >
              <FiSearch size={24} />
            </button>
          </div>
          <button 
            className="cart-button"
            onClick={() => navigate('/cart')}
          >
            <FiShoppingCart size={24} />
            {cartItemsCount > 0 && (
              <span className="cart-count">{cartItemsCount}</span>
            )}
          </button>
        </div>
      </header>

      <section className="menu-section">
        <div 
          className={`section-wrapper ${isExpanded ? 'expanded' : ''}`}
          onClick={toggleAccordion}
        >
          <div className="section-header">
            <h2 className="section-title">
              Recommended ({filteredMenuItems.length})
            </h2>
            <button 
              className={`expand-button ${isExpanded ? 'expanded' : ''}`}
              aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          className={`menu-items-wrapper ${isExpanded ? 'expanded' : ''}`}
          ref={menuItemsRef}
        >
          <div className="menu-items">
            {filteredMenuItems.map((item) => (
              <MenuItem 
                key={item.id} 
                item={item} 
                searchQuery={searchQuery}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MenuPage;

