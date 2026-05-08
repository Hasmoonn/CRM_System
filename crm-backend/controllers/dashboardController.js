import leadModel from "../models/leadModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Count leads by each status
    const totalLeads = await leadModel.countDocuments();
    const newLeads = await leadModel.countDocuments({ status: "New" });
    const contactedLeads = await leadModel.countDocuments({
      status: "Contacted",
    });

    const qualifiedLeads = await leadModel.countDocuments({
      status: "Qualified",
    });

    const proposalSentLeads = await leadModel.countDocuments({
      status: "Proposal Sent",
    });

    const wonLeads = await leadModel.countDocuments({ status: "Won" });
    const lostLeads = await leadModel.countDocuments({ status: "Lost" });

    // Total estimated deal value across all leads
    const totalDealValueResult = await leadModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$estimatedDealValue" },
        },
      },
    ]);

    // Total value of only won deals
    const wonDealValueResult = await leadModel.aggregate([
      {
        $match: { status: "Won" },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$estimatedDealValue" },
        },
      },
    ]);

    // If no leads exist the aggregate returns empty array so we default to 0
    const totalDealValue =
      totalDealValueResult.length > 0 ? totalDealValueResult[0].total : 0;

    const wonDealValue =
      wonDealValueResult.length > 0 ? wonDealValueResult[0].total : 0;

    // Breakdown of leads grouped by source
    const leadsBySource = await leadModel.aggregate([
      {
        $group: {
          _id: "$leadSource",
          count: { $sum: 1 },
        },
      },
    ]);

    // Breakdown of leads grouped by status
    const leadsByStatus = await leadModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Last 5 recently added leads
    const recentLeads = await leadModel.find().sort({ createdAt: -1 }).limit(5).select("leadName companyName status estimatedDealValue createdAt");

    return res.status(200).json({
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      proposalSentLeads,
      wonLeads,
      lostLeads,
      totalDealValue,
      wonDealValue,
      leadsBySource,
      leadsByStatus,
      recentLeads,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};