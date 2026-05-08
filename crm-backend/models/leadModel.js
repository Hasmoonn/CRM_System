import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    leadName: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    leadSource: {
      type: String,
      enum: ["Website", "LinkedIn", "Referral", "Cold Email", "Event", "Other"],
      default: "Website",
    },
    assignedSalesperson: {
      type: String,
      required: [true, "Assigned salesperson is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"],
      default: "New",
    },
    estimatedDealValue: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const leadModel = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export default leadModel;