import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

// CREATE ORDER
router.post("/create", async (req, res) => {
  try {
    console.log("ORDER API HIT:", req.body);

    const order = await Order.create({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      paymentId: req.body.paymentId,
      orderId: req.body.orderId,
      status: "Pending",
    });

    console.log("ORDER SAVED:", order);

    res.json(order);
  } catch (err) {
    console.log("ORDER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET ORDERS (THIS IS WHAT YOU NEED)
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
