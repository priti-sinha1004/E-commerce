import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const selectedProduct = products.find((item) => item.id === productId);
    if (selectedProduct) {
      setProductData(selectedProduct);
      setImage(selectedProduct.image); // Default image
    } else {
      setProductData(null);
    }
  }, [productId, products]); // Re-run when productId or products change

  return (
    <div>
      {productData ? (
        <div>
          <h2>{productData.name}</h2>
          <p>Price: ${productData.price}</p>
          
          {/* Main Product Image */}
          <img src={image} alt={productData.name} style={{ width: "300px" }} />

          {/* Thumbnail Gallery (if multiple images exist) */}
          {productData.images && productData.images.length > 1 && (
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {productData.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: "50px",
                    cursor: "pointer",
                    border: img === image ? "2px solid blue" : "1px solid gray",
                  }}
                  onClick={() => setImage(img)}
                />
              ))}
            </div>
          )}

          <p>{productData.description}</p>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default Product;
