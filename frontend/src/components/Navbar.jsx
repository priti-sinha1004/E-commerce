import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { showSearch, setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <>
      <div className="w-full shadow-md bg-white fixed top-0 left-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="h-8 sm:h-10" />
          </Link>

          {/* Menu Links */}
          <div className="hidden md:flex gap-6 font-medium text-gray-700">
            <Link to="/" className="hover:text-black">Home</Link>
            <Link to="/collection" className="hover:text-black">Collection</Link>
            <Link to="/about" className="hover:text-black">About</Link>
            <Link to="/contact" className="hover:text-black">Contact</Link>
          </div>

          {/* Right Section (Search + Cart + Profile) */}
          <div className="flex items-center gap-4">
            {/* Search Toggle */}
            <img
              src={assets.search_icon}
              alt="Search"
              className="w-5 cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
            />

            {/* Cart */}
            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} alt="Cart" className="w-5 cursor-pointer" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link to="/login">
              <img src={assets.profile_icon} alt="Profile" className="w-6 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
