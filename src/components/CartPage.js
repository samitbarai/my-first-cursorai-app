import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BiRupee, BiMinus, BiPlus } from 'react-icons/bi';
import { FiArrowLeft } from 'react-icons/fi';

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add items to get started</p>
          <button 
            className="btn-outline"
            onClick={() => navigate('/')}
          >
            <FiArrowLeft className="inline mr-2" />
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="flex justify-between items-center pb-4 mb-6 border-b">
        <h1 className="text-2xl font-semibold">Cart</h1>
        <div className="text-xl flex items-center gap-2">
          <span className="font-medium">Total:</span>
          <span className="flex items-center text-primary font-semibold">
            <BiRupee className="text-2xl" />
            {total.toFixed(2)}
          </span>
        </div>
      </header>

      <div className="space-y-4 mb-8">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-grow">
              <h3 className="font-medium mb-1">{item.name}</h3>
              <p className="flex items-center text-primary font-semibold">
                <BiRupee className="text-xl" />
                {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button 
                  className="p-2 text-primary hover:bg-gray-50 transition-colors"
                  onClick={() => addToCart(item, Math.max(0, item.quantity - 1))}
                >
                  <BiMinus />
                </button>
                <span className="px-4 font-medium">{item.quantity}</span>
                <button 
                  className="p-2 text-primary hover:bg-gray-50 transition-colors disabled:text-gray-300"
                  onClick={() => addToCart(item, Math.min(item.quantity + 1, 10))}
                  disabled={item.quantity >= 10}
                >
                  <BiPlus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-4">
        <button 
          className="btn-outline flex-1 flex items-center justify-center"
          onClick={() => navigate('/')}
        >
          <FiArrowLeft className="mr-2" />
          Add more items
        </button>
        <button className="btn-primary flex-1">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage; 