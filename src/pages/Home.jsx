import React, { useContext } from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsLetterBox";
import SearchBar from "../components/SearchBar";
import { ShopContext } from "../context/ShopContext";

const Home = () => {
  const { showSearch } = useContext(ShopContext);

  return (
    <div className="relative">
      {/* Dynamic SearchBar overlay */}
      {showSearch && (
        <div className="absolute top-20 left-0 w-full z-50">
          <SearchBar />
        </div>
      )}

      <div className="pt-20">
        <Hero />
        <LatestCollection />
        <BestSeller />
        <OurPolicy />
        <NewsletterBox />
      </div>
    </div>
  );
};

export default Home;
