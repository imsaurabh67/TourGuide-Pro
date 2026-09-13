import express from "express";
import {
  createBooking,
  getMyBookings,
  getGuideBookings,
  updateBookingStatus,
  createOrder,
  confirmPayment
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";
import { requireRole } from "../middleware/roleCheck.js";

const router = express.Router();
router.post("/", protect, requireRole("traveler"), createBooking);
router.get("/my", protect, getMyBookings);
router.get("/guide", protect, requireRole("guide"), getGuideBookings);
router.patch("/:id/status", protect, updateBookingStatus);
router.post("/:id/create-order", protect, requireRole("traveler"), createOrder);
router.post("/:id/confirm-payment", protect, confirmPayment);

export default router;
