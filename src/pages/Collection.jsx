import React, { useContext, useState, useMemo, useCallback } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = useCallback((e) => {
    setCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  }, []);

  const toggleSubCategory = useCallback((e) => {
    setSubCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    if (sortType === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, category, subCategory, search, showSearch, sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2' onClick={() => setShowFilter(!showFilter)}>
          FILTERS
          <img
            className={`h-3 sm:hidden transform transition-transform ${showFilter ? 'rotate-90' : 'rotate-0'}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['MEN', 'WOMEN', 'KIDS'].map((cat) => (
              <label key={cat} className='flex gap-2'>
                <input className='w-3' type="checkbox" value={cat} onChange={toggleCategory} />
                {cat.charAt(0) + cat.slice(1).toLowerCase()}
              </label>
            ))}
          </div>
        </div>

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>SUB-CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['TOPWEAR', 'BOTTOMWEAR', 'WINTERWEAR'].map((subCat) => (
              <label key={subCat} className='flex gap-2'>
                <input className='w-3' type="checkbox" value={subCat} onChange={toggleSubCategory} />
                {subCat.charAt(0) + subCat.slice(1).toLowerCase()}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products match your filters.</p>
          ) : (
            filteredProducts.map((item) => (
              <ProductItem key={item._id} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
