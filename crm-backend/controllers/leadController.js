import leadModel from "../models/leadModel.js";


export const createLead = async (req, res) => {
  try {
    const {
      leadName,
      companyName,
      email,
      phone,
      leadSource,
      assignedSalesperson,
      status,
      estimatedDealValue,
    } = req.body;

    if (!leadName || !companyName || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const lead = await leadModel.create({
      leadName,
      companyName,
      email,
      phone,
      leadSource,
      assignedSalesperson,
      status,
      estimatedDealValue,
      createdBy: req.user._id,
    });

    return res.status(201).json(lead);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


export const getLeads = async (req, res) => {
  try {
    const { status, leadSource, assignedSalesperson, search } = req.query;

    // Build filter object based on query params
    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (leadSource) {
      filter.leadSource = leadSource;
    }

    if (assignedSalesperson) {
      filter.assignedSalesperson = {
        $regex: assignedSalesperson,
        $options: "i",
      };
    }

    // Search by lead name, company name, or email
    if (search) {
      filter.$or = [
        { leadName: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await leadModel
      .find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(leads);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


export const getLeadById = async (req, res) => {
  try {
    const lead = await leadModel
      .findById(req.params.id)
      .populate("createdBy", "name email");

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json(lead);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


export const updateLead = async (req, res) => {
  try {
    const lead = await leadModel.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const updatedLead = await leadModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json(updatedLead);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


export const deleteLead = async (req, res) => {
  try {
    const lead = await leadModel.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await leadModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const lead = await leadModel.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.status = status;
    await lead.save();

    return res.status(200).json(lead);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};