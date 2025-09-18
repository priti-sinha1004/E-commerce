import express from "express";
import multer from "multer";
import { addProduct, removeProduct, singleProduct, listProduct } from "../controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js"; // ✅ fixed naming
const productRouter = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ➤ Add product
productRouter.post(
  "/add",
  adminAuth, // ✅ correct casing
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// ➤ List all products
productRouter.get("/list", listProduct);

// ➤ Get single product by ID
productRouter.get("/single/:id", singleProduct);

// ➤ Delete product by ID
productRouter.delete("/remove/:id", adminAuth, removeProduct);

export default productRouter;
