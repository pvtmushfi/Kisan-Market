import axios from "axios";

// Backend API URL
const API = "http://localhost:5000/api/products";

// Get All Products
export const getProducts = async () => {
  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.error("Get Products Error:", error);
    throw error;
  }
};

// Add New Product
export const addProduct = async (formData) => {
  try {
    const response = await axios.post(API, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Add Product Error:", error);
    throw error;
  }
};

// Delete Product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete Product Error:", error);
    throw error;
  }
};

// Get Single Product
export const getSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Single Product Error:", error);
    throw error;
  }
};

// Update Product
export const updateProduct = async (id, formData) => {
  try {
    const response = await axios.put(`${API}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Update Product Error:", error);
    throw error;
  }
};