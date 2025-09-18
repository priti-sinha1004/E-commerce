import React, { useState, createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { products } from "../assets/assets"; // Import product data

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate(); // ✅ useNavigate hook

  // Add item to cart
  const addToCart = (itemId, size) => {
    setCartItems((prevCartItems) => {
      const cartData = { ...prevCartItems };
      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = { [size]: 1 };
      }
      return cartData;
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId, size) => {
    setCartItems((prevCartItems) => {
      const cartData = { ...prevCartItems };
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
      return cartData;
    });
  };

  // Update item quantity
  const updateCartQuantity = (itemId, size, action) => {
    setCartItems((prevCartItems) => {
      const cartData = { ...prevCartItems };
      if (cartData[itemId] && cartData[itemId][size]) {
        if (action === "increase") {
          cartData[itemId][size] += 1;
        } else if (action === "decrease" && cartData[itemId][size] > 1) {
          cartData[itemId][size] -= 1;
        }
      }
      return cartData;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems({});
  };

  // Get total count of items
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  // Get total price of items
  const getCartTotal = () => {
    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const product = products.find((p) => p._id === itemId);
        if (product) {
          total += product.price * cartItems[itemId][size];
        }
      }
    }
    return total + delivery_fee;
  };

  const value = useMemo(
    () => ({
      products,
      currency,
      delivery_fee,
      search,
      navigate, // ✅ Include navigate in context
      setSearch,
      showSearch,
      setShowSearch,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      getCartCount,
      getCartTotal,
    }),
    [products, cartItems, search, showSearch]
  );

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
