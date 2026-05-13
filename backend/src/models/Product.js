import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
    },

    description: {
      type: String,
    },

    category: {
      type: String,
      default: "vegetable",
    },

    quantity: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      default: "kg",
    },

    available: {
      type: Boolean,
      default: true,
    },

    farmerName: {
      type: String,
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;