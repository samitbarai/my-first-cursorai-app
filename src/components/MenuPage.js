import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">The Belgian Waffle Co.</h1>
          <p className="text-gray-600">40-45 mins</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            {isSearchVisible && (
              <input
                type="text"
                className="w-64 px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            )}
            <button 
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
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
            className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => navigate('/cart')}
          >
            <FiShoppingCart size={24} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-[1.25rem] text-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <section>
        <div 
          className="cursor-pointer select-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex justify-between items-center py-4 border-b">
            <h2 className="text-xl font-semibold">
              Recommended ({filteredMenuItems.length})
            </h2>
            <button 
              className={`p-2 text-gray-600 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
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

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-4 py-4">
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

