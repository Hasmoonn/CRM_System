import express from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
} from "../controllers/leadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getLeads).post(createLead);

router.route("/:id").get(getLeadById).put(updateLead).delete(deleteLead);

router.patch("/:id/status", updateLeadStatus);

export default router;