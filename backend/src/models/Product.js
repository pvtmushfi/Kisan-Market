import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Auto Product ID
    productId: {
      type: String,
      unique: true,
    },

    // Product Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Product Price
    price: {
      type: Number,
      required: true,
    },

    // Product Image
    image: {
      type: String,
      default: "",
    },

    // Description
    description: {
      type: String,
      required: true,
    },

    // Category Dropdown
    category: {
      type: String,
      required: true,
      enum: [
        "Fruits",
        "Vegetables",
        "Grains",
        "Seeds",
        "Dairy",
      ],
    },

    // Quantity
    quantity: {
      type: Number,
      required: true,
    },

    // Unit
    unit: {
      type: String,
      default: "kg",
    },

    // Stock Availability
    available: {
      type: Boolean,
      default: true,
    },

    // Discount %
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Farmer Name
    farmerName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto Generate Product ID
productSchema.pre("save", function (next) {
  if (!this.productId) {
    this.productId =
      "PROD-" + Math.floor(100000 + Math.random() * 900000);
  }

  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
