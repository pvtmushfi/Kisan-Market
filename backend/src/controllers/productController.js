import Product from '../models/Product.js';

// Get all products (public)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('farmer', 'name');
    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add product (only farmer, from token)
export const addProduct = async (req, res) => {
  try {
    const { name, price, quantity, category, description, unit } = req.body;
    if (!name || price === undefined || quantity === undefined) {
      return res.status(400).json({ error: 'Name, price, and quantity are required' });
    }

    const product = await Product.create({
      name,
      price: Number(price),
      quantity: Number(quantity),
      category: category || 'vegetable',
      description: description || '',
      unit: unit || 'kg',
      farmer: req.user.id,
      farmerName: req.user.name,
      available: true
    });

    res.status(201).json({ data: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product (only the farmer who owns it)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id, farmer: req.user.id });
    if (!product) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }
    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};