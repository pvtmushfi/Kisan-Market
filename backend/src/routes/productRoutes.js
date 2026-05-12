import express from "express";
import multer from "multer";
import path from "path";

import {
  getProducts,
  addProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/products");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;

  const isValid = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

// Upload Middleware
const upload = multer({
  storage,
  fileFilter,
});

// Routes
router.get("/", getProducts);

// Add Product with Image Upload
router.post("/", upload.single("image"), addProduct);

// Delete Product
router.delete("/:id", deleteProduct);

export default router;