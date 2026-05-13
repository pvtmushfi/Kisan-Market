import express from "express";

import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/", addToCart);

router.get("/", getCart);

router.delete("/:id", removeFromCart);

export default router;
