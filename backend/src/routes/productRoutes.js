import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const filePath = path.resolve("src/data/products.json");

// GET products from JSON file
router.get("/", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(data);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error reading products file" });
  }
});

export default router;
