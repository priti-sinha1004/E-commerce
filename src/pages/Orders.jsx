import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const { cartItems, products, currency, getCartTotal, delivery_fee } = useContext(ShopContext);

  const getProductById = (id) => products.find((p) => p._id === id);

  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Simulated order statuses
  const statuses = ["Processing", "Shipped", "Out for Delivery", "Delivered"];

  const handleTrackOrder = (productName) => {
    alert(`Tracking info for "${productName}":\nStatus: ${statuses[Math.floor(Math.random() * statuses.length)]}\nEstimated Delivery: 3-5 business days`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="text-3xl font-bold mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {Object.keys(cartItems).length === 0 ? (
        <p className="text-gray-600 text-lg">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(cartItems).map(([productId, sizes]) => {
            const product = getProductById(productId);
            if (!product) return null;

            const status = statuses[Math.floor(Math.random() * statuses.length)];

            return (
              <div
                key={productId}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                      <span className="text-sm text-gray-500">Ordered on: {orderDate}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium 
                        ${status === "Delivered" ? "bg-green-100 text-green-800" : ""}
                        ${status === "Shipped" ? "bg-blue-100 text-blue-800" : ""}
                        ${status === "Out for Delivery" ? "bg-yellow-100 text-yellow-800" : ""}
                        ${status === "Processing" ? "bg-gray-100 text-gray-800" : ""}`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Sizes & Quantity Grid */}
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    {Object.entries(sizes).map(([size, quantity]) => (
                      <React.Fragment key={size}>
                        <div className="font-medium">Size: {size}</div>
                        <div>Quantity: {quantity}</div>
                        <div>
                          Price: {currency}
                          {(product.price * quantity).toFixed(2)}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>

                  <button
                    onClick={() => handleTrackOrder(product.name)}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            );
          })}

          {/* Total Summary */}
          <div className="mt-10 p-6 bg-gray-50 rounded-lg shadow-inner text-right text-lg md:text-xl font-semibold space-y-2">
            <p>
              Delivery Fee: {currency}{delivery_fee.toFixed(2)}
            </p>
            <p>
              Total: {currency}{getCartTotal().toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
