import React from 'react';
import './MenuPage.css';
import MenuItem from './MenuItem';
import menuData from '../data/menuItems.json';

function MenuPage() {
  const { menuItems } = menuData;

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <h1 className="restaurant-name">The Belgian Waffle Co.</h1>
          <p className="delivery-time">40-45 mins</p>
        </div>
        <button className="search-button">
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
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </header>

      <section className="menu-section">
        <div className="section-header">
          <h2 className="section-title">Recommended ({menuItems.length})</h2>
          <button className="expand-button">
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

        <div className="menu-items">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default MenuPage;

