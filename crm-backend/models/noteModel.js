import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Note content is required"],
      trim: true,
    },
    createdBy: {
      type: String,
      required: [true, "Created by is required"],
    },
  },
  {
    timestamps: true,
  }
);

const noteModel = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default noteModel;