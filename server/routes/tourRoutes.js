import express from "express";
import {
  createTour,
  getTours,
  getTourById,
  updateTour,
  deleteTour,
  getMyTours
} from "../controllers/tourController.js";
import { protect } from "../middleware/auth.js";
import { requireRole } from "../middleware/roleCheck.js";

const router = express.Router();
router.get("/", getTours);
router.get("/mine", protect, requireRole("guide"), getMyTours);
router.get("/:id", getTourById);
router.post("/", protect, requireRole("guide"), createTour);
router.put("/:id", protect, requireRole("guide"), updateTour);
router.delete("/:id", protect, requireRole("guide"), deleteTour);

export default router;
