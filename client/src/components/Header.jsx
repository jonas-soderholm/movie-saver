import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSharedState } from "../SharedContext.js";
import logout from "../logout.js";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, setCartItems } = useSharedState(); // State to keep track of cart items
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    setIsLoggedIn(!!accessToken);
  }, []);

  function logoutHandler() {
    logout();
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <header className="dark:bg-neutral-800 text-white sticky top-0 z-50">
      <div className="p-3 flex justify-between mx-1">
        <div className="flex items-center ">
          <a href="/" className="md:text-2xl text-1xl text-slate-200">
            Saveer
          </a>
        </div>
        <div className="flex items-center md:gap-10 gap-4">
          <a href="/profile" className="md:text-1xl text-1xl text-slate-200">
            My Profile
          </a>
          {isLoggedIn ? (
            <>
              <a onClick={logoutHandler} className="md:text-1xl text-1xl text-slate-200 cursor-pointer">
                Logout
              </a>
            </>
          ) : (
            <>
              <a href="/login" className="md:text-1xl text-1xl text-slate-200">
                Login
              </a>
              {/* <a href="/signup" className="md:text-1xl text-1xl text-slate-200">
                Sign up
              </a> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
