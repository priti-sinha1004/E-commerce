import React, { useContext, useState, useMemo, useCallback } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

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

  // 🔹 Filter products based on search + filters
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) =>
        search ? item.name.toLowerCase().includes(search.toLowerCase()) : true
      )
      .filter((item) =>
        category.length > 0 ? category.includes(item.category?.toUpperCase()) : true
      )
      .filter((item) =>
        subCategory.length > 0
          ? subCategory.includes(item.subCategory?.toUpperCase())
          : true
      )
      .sort((a, b) => {
        if (sortType === "low-high") return a.price - b.price;
        if (sortType === "high-low") return b.price - a.price;
        return 0; // relevant (default)
      });
  }, [products, search, category, subCategory, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-20 border-t">
      {/* FILTERS */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transform transition-transform ${
              showFilter ? "rotate-90" : "rotate-0"
            }`}
            src={assets.dropdown_icon}
            alt="dropdown"
          />
        </p>

        {/* Categories */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["MEN", "WOMEN", "KIDS"].map((cat) => (
              <label key={cat} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                />
                {cat.charAt(0) + cat.slice(1).toLowerCase()}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategories */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">SUB-CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["TOPWEAR", "BOTTOMWEAR", "WINTERWEAR"].map((subCat) => (
              <label key={subCat} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={subCat}
                  onChange={toggleSubCategory}
                />
                {subCat.charAt(0) + subCat.slice(1).toLowerCase()}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="flex-1">
        {/* SearchBar */}
        <SearchBar />

        {/* Header + Sort */}
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">
              No products match your search or filters.
            </p>
          ) : (
            filteredProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
