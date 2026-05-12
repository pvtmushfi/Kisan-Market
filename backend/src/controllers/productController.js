import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, '../data/products.json');

// Read Products
const readProducts = async () => {
  try {
    const content = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(content || '[]');
  } catch (error) {
    return [];
  }
};

// Write Products
const writeProducts = async (products) => {
  await fs.writeFile(
    dataPath,
    JSON.stringify(products, null, 2),
    'utf8'
  );
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await readProducts();

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Add Product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      quantity,
      unit,
      category,
      farmerId,
      farmerName,
      discount,
      available,
    } = req.body;

    // Validation
    if (!name || price === undefined || quantity === undefined || !description) {
      return res.status(400).json({
        success: false,
        error: 'Name, price, quantity, and description are required',
      });
    }

    const products = await readProducts();

    // Auto Product ID - Generate unique ID
    const productId =
      'PROD-' + Math.floor(100000 + Math.random() * 900000);

    // New Product Object with all fields
    const newProduct = {
      id: Date.now().toString(),
      productId, // Auto-Generated Product ID

      // Product Details
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      quantity: Number(quantity),
      unit: unit || 'kg',

      // Category Dropdown - Classify products
      category: category || 'Fruits',

      // Farmer Info
      farmerId: farmerId || null,
      farmerName: farmerName || 'Unknown Farmer',

      // Product Image Upload
      image: req.file
        ? `/uploads/products/${req.file.filename}`
        : null,

      // Stock Availability Toggle - Show if product is in stock
      available:
        available === 'true' || available === true
          ? true
          : false,

      // Discount Field - Allow sellers to add offers
      discount: Math.min(Math.max(Number(discount) || 0, 0), 100), // Ensure 0-100 range

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.push(newProduct);

    await writeProducts(products);

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await readProducts();

    const productIndex = products.findIndex(
      (p) => p.id === id
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    products.splice(productIndex, 1);

    await writeProducts(products);

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};