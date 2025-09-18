import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const SearchBar = () => {
  const { products, search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!search) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    // Remove duplicates by name
    const unique = Array.from(new Map(filtered.map((p) => [p.name, p])).values());
    setFilteredProducts(unique);
  }, [search, products]);

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="font-bold text-blue-600">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (!showSearch) return null;

  return (
    <div className="flex flex-col items-center justify-center py-4 bg-gray-50 border-b">
      <div className="flex items-center border border-gray-400 rounded-full px-4 py-2 w-3/4 sm:w-1/2 bg-white shadow-sm">
        <img className="w-4 mr-2" src={assets?.search_icon} alt="search icon" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none text-sm bg-transparent"
          type="text"
          placeholder="Search products..."
        />
        {search && (
          <img
            onClick={() => setSearch("")}
            className="w-3 ml-2 cursor-pointer"
            src={assets?.cross_icon}
            alt="clear search"
          />
        )}
      </div>

      {/* Live search results */}
      {filteredProducts.length > 0 && (
        <div className="mt-2 w-3/4 sm:w-1/2 bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {highlightMatch(product.name, search)}
            </div>
          ))}
        </div>
      )}
      {search && filteredProducts.length === 0 && (
        <div className="mt-2 w-3/4 sm:w-1/2 bg-white border border-gray-300 rounded shadow px-4 py-2 text-gray-500">
          No products found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
