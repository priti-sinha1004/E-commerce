import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title'; // adjust the path if needed

const CartTotal = () => {
  const { currency, delivery_fee, getCartTotal } = useContext(ShopContext);

  // subtotal without delivery fee
  const subTotal = getCartTotal() - delivery_fee;
  const total = getCartTotal();

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>{currency}{subTotal > 0 ? subTotal : 0}</p>
        </div>

        <hr />

        {/* Shipping Fee */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee}.00</p>
        </div>

        <hr />

        {/* Total */}
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency}{total > 0 ? total : 0}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
