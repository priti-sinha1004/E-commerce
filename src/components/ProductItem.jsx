import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="text-gray-700 cursor-pointer group"
      to={id ? `/product/${id}` : '#'}
    >
      <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200 transition-all duration-300 group-hover:shadow-xl group-hover:border-gray-300">
        <img
          className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
          src={image[0]}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm group-hover:text-black transition-colors duration-300">
        {name}
      </p>
      <p className="text-sm font-medium">{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
