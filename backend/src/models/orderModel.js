import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    items: Array,
    amount: Number,
    paymentId: String,
    orderId: String,
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true },
);

// 🔴 FIX: Prevent overwrite error
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
