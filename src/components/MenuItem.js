import React from 'react';
import { BsCircleFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { BiRupee, BiMinus, BiPlus } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { useCart } from '../context/CartContext';

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
        <span key={index} className="bg-yellow-200">{part}</span>
      ) : part
    );
  };

  return (
    <div className="flex border border-gray-200 rounded-lg p-4">
      <div className="flex-grow">
        <div className="flex items-center gap-3">
          {item.isVeg && (
            <span className="flex items-center justify-center w-4 h-4 border-2 border-primary rounded-sm">
              <BsCircleFill className="w-2 h-2 text-primary" />
            </span>
          )}
          <h3 className="text-lg font-medium">{highlightText(item.name)}</h3>
          <p className="flex items-center text-lg font-semibold text-primary">
            <BiRupee className="inline" />{item.price.toFixed(2)}
          </p>
        </div>
        
        <div className="mt-2">
          {item.rating && (
            <div className="flex items-center gap-1 mb-1">
              <span className="flex items-center text-primary font-medium">
                <AiFillStar className="text-yellow-400 mr-1" />
                {item.rating}
              </span>
              <span className="text-gray-500">({item.reviews})</span>
            </div>
          )}
          <p className="text-gray-600 text-sm">{highlightText(item.description)}</p>
        </div>
        
        <div className="mt-4 flex items-center gap-2 text-gray-500">
          <MdEdit className="text-sm" />
          <span className="text-sm">Customisable</span>
        </div>
      </div>

      <div className="w-40 flex flex-col items-center gap-2">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover rounded-lg"
        />
        {quantity === 0 ? (
          <button 
            className="btn-primary w-full"
            onClick={handleIncrement}
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center justify-between w-full border border-gray-200 rounded">
            <button 
              className="p-2 text-primary hover:bg-gray-50"
              onClick={handleDecrement}
            >
              <BiMinus />
            </button>
            <span className="text-primary font-medium">{quantity}</span>
            <button 
              className="p-2 text-primary hover:bg-gray-50 disabled:text-gray-300"
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