import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { products } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate here
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartQuantity,
    currency,
  } = useContext(ShopContext);

  const navigate = useNavigate(); // ✅ useNavigate hook

  // Convert cartItems object into a list for display
  const cartList = [];
  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      const quantity = cartItems[itemId][size];
      const product = products.find((p) => p._id === itemId);
      if (product) {
        cartList.push({
          ...product,
          size,
          quantity,
        });
      }
    }
  }

  return (
    <div className="pt-20 px-6 pb-10">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {cartList.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
          <Link
            to="/collection"
            className="inline-block mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartList.map((item) => (
              <div
                key={`${item._id}-${item.size}`}
                className="flex items-center justify-between border-b pb-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-sm text-gray-500">
                      {currency}
                      {item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() =>
                      updateCartQuantity(item._id, item.size, "decrease")
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() =>
                      updateCartQuantity(item._id, item.size, "increase")
                    }
                  >
                    +
                  </button>
                </div>

                {/* Remove + Line Price */}
                <div className="flex flex-col items-end">
                  <button
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                  <p className="font-medium">
                    {currency}
                    {item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Cart Totals Section */}
          <div className="mt-8 max-w-md ml-auto">
            <CartTotal />
            <div className="w-full text-right mt-4">
              <button
                onClick={() => navigate("/PlaceOrder")} // ✅ navigate fixed
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
              >
                PROCEED TO PAY
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
