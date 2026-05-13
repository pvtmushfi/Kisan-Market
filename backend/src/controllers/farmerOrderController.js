import Order from "../models/Order.js";

export const updateFarmerOrderStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const updatedOrder =
      await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order",
    });
  }
};