import noteModel from "../models/noteModel.js";
import leadModel from "../models/leadModel.js";


export const addNote = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Note content is required" });
    }

    const lead = await leadModel.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const note = await noteModel.create({
      lead: req.params.id,
      content,
      createdBy: req.user.name,
    });

    return res.status(201).json(note);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


export const getNotesByLead = async (req, res) => {
  try {
    const lead = await leadModel.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const notes = await noteModel
      .find({ lead: req.params.id })
      .sort({ createdAt: -1 });

    return res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


export const deleteNote = async (req, res) => {
  try {
    const note = await noteModel.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await noteModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};