import axios from 'axios';
import { getAuthToken } from './authService';

const API_URL = 'http://localhost:5000/api/products';

// Helper to get auth headers
const authHeader = () => ({
  headers: { Authorization: `Bearer ${getAuthToken()}` },
});

// Get all products (public)
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data.data; // your backend returns { data: [...] }
};

// Add a new product (farmer only)
export const addProduct = async (productData) => {
  const response = await axios.post(API_URL, productData, authHeader());
  return response.data.data;
};

// Delete a product (farmer who owns it)
export const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_URL}/${productId}`, authHeader());
  return response.data;
};

// Get products by category (optional)
export const getProductsByCategory = async (category) => {
  const all = await getProducts();
  return all.filter(p => p.category === category);
};