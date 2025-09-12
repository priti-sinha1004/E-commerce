import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { currency, delivery_fee, getCartTotal } = useContext(ShopContext);

  const total = getCartTotal ? getCartTotal() : 0;
  const deliveryFee = delivery_fee || 0;
  const subTotal = total - deliveryFee;

  const handlePlaceOrder = () => {
    // Here you could add order saving logic (e.g. API call)
    navigate("/orders");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-10 pt-10 px-5 sm:px-20 min-h-[80vh]">

      {/* Left: Delivery Info */}
      <div className="w-full sm:max-w-[500px] flex flex-col gap-4">
        <Title text1="delivery" text2="INFORMATION" />

        {/* Delivery Options Heading */}
        <h2 className="text-lg font-semibold mt-4 mb-2">DELIVERY INFORMATION</h2>

        <div className="flex gap-4">
          <input type="text" placeholder="First name" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Last name" className="w-full border p-2 rounded" />
        </div>

        <input type="email" placeholder="Email address" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Street" className="w-full border p-2 rounded" />

        <div className="flex gap-4">
          <input type="text" placeholder="City" className="w-full border p-2 rounded" />
          <input type="text" placeholder="State" className="w-full border p-2 rounded" />
        </div>

        <div className="flex gap-4">
          <input type="text" placeholder="Zipcode" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Country" className="w-full border p-2 rounded" />
        </div>

        <input type="text" placeholder="Phone" className="w-full border p-2 rounded" />
      </div>

      {/* Right: Cart Totals & Payment */}
      <div className="w-full sm:max-w-[400px] flex flex-col gap-6">

        {/* Cart Totals */}
        <div>
          <Title text1="cart" text2="TOTALS" />
          <div className="flex justify-between border-b py-2">
            <span>Subtotal</span>
            <span>{currency}{subTotal > 0 ? subTotal.toFixed(2) : "0.00"}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span>Shipping Fee</span>
            <span>{currency}{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold py-2">
            <span>Total</span>
            <span>{currency}{total > 0 ? total.toFixed(2) : "0.00"}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <div className="text-md font-semibold mb-2">Payment Method</div>
          <div className="flex flex-wrap gap-3">
            <button className="border px-4 py-2 rounded">Stripe</button>
            <button className="border px-4 py-2 rounded">Razorpay</button>
            <label className="flex items-center gap-2 border px-4 py-2 rounded cursor-pointer">
              <input type="radio" name="payment" checked readOnly />
              Cash on Delivery
            </label>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="bg-black text-white py-3 mt-4 rounded hover:opacity-90"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
