import React, { useEffect } from "react"; // Import useEffect
import { useSharedState } from "../SharedContext.js";

const Cart = () => {
  const { cartItems, setCartItems } = useSharedState();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  const removeFromCart = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Update localStorage
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-[30rem] mx-2 flex-wrap my-4 w-full">
        <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
        <ul className="mx-2 gap-5">
          {cartItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center py-2 border-b">
              <button onClick={() => removeFromCart(index)} className="text-red-500 text-sm mr-4">
                Remove
              </button>

              <span className="font-medium mr-4">{item.title}</span>
              <span className="text-gray-500">{item.price}kr</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between">
          <span className="font-medium">Total:</span>
          <span className="text-gray-700 font-semibold">{calculateTotal(cartItems)}</span>
          {/* Calculate total based on cartItems */}
        </div>
      </div>
    </div>
  );
};

const calculateTotal = (items) => {
  const total = items.reduce((total, item) => total + parseFloat(item.price), 0);
  return `${total.toFixed(2)}kr`;
};

export default Cart;
