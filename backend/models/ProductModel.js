import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true }, // store multiple image paths
  category: { type: String, required: true },
  subCategory: { type: String, default:"" },
  sizes: { type: [String], required: true },
  bestseller: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

// Prevent model overwrite on hot-reload
const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductModel;
