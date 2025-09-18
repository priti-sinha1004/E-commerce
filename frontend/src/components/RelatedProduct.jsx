import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const RelatedProduct = ({ category, subcategory, currentProductId }) => {
  const { products, currency } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      let relatedItems = products.filter(item =>
        item.category === category &&
        item.subcategory === subcategory &&
        item._id !== currentProductId
      );
      setRelated(relatedItems.slice(0, 5));
    }
  }, [products, category, subcategory, currentProductId]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {related.map((item) => (
        <Link 
          to={`/product/${item._id}`} 
          key={item._id} 
          className="border rounded-md p-3 hover:shadow-lg transition"
        >
          <img 
            src={item.image?.[0]} 
            alt={item.name} 
            className="h-40 w-full object-cover rounded-md mb-2" 
          />
          <h3 className="text-sm font-semibold">{item.name}</h3>
          <p className="text-gray-600 text-sm">{currency}{item.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default RelatedProduct;
