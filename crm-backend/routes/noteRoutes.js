import express from "express";
import {
  addNote,
  getNotesByLead,
  deleteNote,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes below are protected
router.use(protect);

router.route("/:id/notes").post(addNote).get(getNotesByLead);

router.delete("/notes/:id", deleteNote);

export default router;