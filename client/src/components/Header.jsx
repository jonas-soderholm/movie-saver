import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSharedState } from "../SharedContext.js";
import logout from "../logout.js";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, setCartItems } = useSharedState(); // State to keep track of cart items
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {}, [cartItems]);

  function logoutHandler() {
    logout();
    navigate("/login");
  }

  return (
    <header className="dark:bg-neutral-800 text-white sticky top-0 z-50">
      <div className="p-3 flex justify-between mx-1">
        <div className="flex items-center ">
          <a href="/" className="md:text-2xl text-1xl text-slate-200">
            The Bookstore
          </a>
        </div>
        <div className="flex items-center md:gap-10 gap-4">
          <div className="relative">
            <a href="/cart">
              <FaShoppingCart className="h-[1.5rem] w-full" />
            </a>
            {cartItems.length > 0 && ( // Display number of items if cart is not empty
              <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full w-4 h-4 text-center text-xs pointer-events-none">
                {cartItems.length}
              </div>
            )}
          </div>
          <a href="/login" className="md:text-1xl text-1xl text-slate-200">
            Login
          </a>
          <a href="/signup" className="md:text-1xl text-1xl text-slate-200">
            Sign up
          </a>
          <a onClick={logoutHandler} href="/logout" className="md:text-1xl text-1xl text-slate-200">
            Logout
          </a>
          <a href="/profile" className="md:text-1xl text-1xl text-slate-200">
            My Profile
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
