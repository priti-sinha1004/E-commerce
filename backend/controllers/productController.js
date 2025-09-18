import ProductModel from "../models/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";

// ➤ Add Product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "Name, description, price, and category are required" });
    }

    // Handle images from req.files safely
    const imageFiles = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0]
    ].filter(Boolean); // removes undefined

    // Upload to Cloudinary only if images exist
    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { folder: "products" });
        return result.secure_url;
      })
    );

    // Parse sizes if sent as string
    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;

    // Create new product in MongoDB
    const newProduct = await ProductModel.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: parsedSizes,
      bestseller: bestseller === "true",
      images: imageUrls,
      date: new Date(),
    });

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: error.message });
  }
};

// ➤ Remove Product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product removed successfully", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➤ Get Single Product
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➤ List All Products with optional pagination
const listProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const products = await ProductModel.find()
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await ProductModel.countDocuments();

    res.status(200).json({ products, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addProduct, removeProduct, singleProduct, listProduct };
