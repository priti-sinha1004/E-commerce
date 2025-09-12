import React, { useState, useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProduct";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [sizeOptions] = useState(["S", "M", "L", "XL", "XXL"]);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [showRelated, setShowRelated] = useState(false);

  const selectedProduct = useMemo(() => {
    return products.find((item) => item._id === productId);
  }, [products, productId]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
      setImage(selectedProduct.image[0]);
    }
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart");
      return;
    }
    addToCart(productData._id, selectedSize);
    toast.success("Added to Cart!");
  };

  if (!productData) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  return (
    <div className="pt-20 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
        {/* Left - Images */}
        <div className="flex-1 flex flex-col gap-3 sm:flex-row">
          {/* Side Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18%] w-full">
            {productData.image?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product Thumbnail ${index + 1}`}
                className={`w-[24%] sm:w-full mb-3 cursor-pointer rounded-md border ${
                  image === img ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setImage(img)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%] flex justify-center items-center">
            <img
              className="w-full h-full max-h-[600px] object-contain rounded-xl"
              src={image}
              alt="Main Product"
            />
          </div>
        </div>

        {/* Right - Product Info */}
        <div className="flex-1">
          <h1 className="font-bold text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <img key={i} src={assets.star_icon} alt="star" className="w-3.5" />
              ))}
            <p className="pl-2 text-gray-600">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* Size Selector */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {sizeOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedSize(item)}
                  className={`border py-2 px-4 rounded-md transition-all ${
                    selectedSize === item
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded-lg"
          >
            ADD TO CART
          </button>

          {/* Additional Info */}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-600 mt-4 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available.</p>
            <p>Easy return within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20">
        <div className="flex border-b text-sm">
          <button
            className={`px-5 py-3 ${
              activeTab === "description" ? "border-b-2 border-black font-medium" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-5 py-3 ${
              activeTab === "reviews" ? "border-b-2 border-black font-medium" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (122)
          </button>
        </div>
        <div className="mt-5 text-sm text-gray-600">
          {activeTab === "description" ? (
            <p>{productData.description}</p>
          ) : (
            <div>
              <p className="mb-2">⭐ User1: Great quality!</p>
              <p className="mb-2">⭐ User2: Fast shipping!</p>
              <p>⭐ User3: Worth the price!</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <button
          onClick={() => setShowRelated(!showRelated)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          <span>{showRelated ? "Hide Related Products" : "Show Related Products"}</span>
          <img
            src={assets.dropdown_icon}
            alt="toggle"
            className={`w-4 transform transition-transform ${
              showRelated ? "rotate-180" : ""
            }`}
          />
        </button>

        {showRelated && (
          <div className="mt-5 transition-all duration-300 ease-in-out">
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
