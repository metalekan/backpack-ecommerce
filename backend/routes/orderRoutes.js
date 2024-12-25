import express from "express";
const router = express.Router();
import { authorizeAdmin, authenticate } from "../middleware/authMiddleware.js";
import {
  countTotalOrders,
  createOrder,
  getAllOrders,
  getUserOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

router.route("/mine").get(authenticate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authenticate, findOrderById);
router.route("/:id/pay").patch(authenticate, markOrderAsPaid);
router
  .route("/:id/deliver")
  .patch(authenticate, authorizeAdmin, markOrderAsDelivered);

export default router;
