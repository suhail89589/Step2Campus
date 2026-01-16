import Mentor from "../models/Mentor.js";
import Student from "../models/student.js"; // Standardized capitalization

// 1. Unified Dashboard Data
export const getDashboardStats = async (req, res) => {
  try {
    // SDE-2 Optimization: Fetching everything needed.
    // .lean() is used to get plain JS objects which are easier to manipulate.
    const [mentors, students] = await Promise.all([
      Mentor.find({}).sort({ createdAt: -1 }).lean(),
      Student.find({}).sort({ createdAt: -1 }).lean(),
    ]);

    // DEBUG LOGS - Check your terminal
    console.log(
      `Fetch Success: ${mentors.length} Mentors, ${students.length} Students`
    );

    const stats = {
      totalMentors: mentors.length,
      totalStudents: students.length,
      pendingMentors: mentors.filter((m) => m.status === "PENDING").length,
    };

    res.status(200).json({
      success: true,
      recentMentors: mentors, // Contains full info: age, phone, emails, etc.
      students: students,
      stats,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Server failed to fetch dashboard data",
      error: error.message,
    });
  }
};

// 2. Update Mentor Status (Approve/Reject)
export const updateMentorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["APPROVED", "REJECTED", "PENDING"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const mentor = await Mentor.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!mentor) {
      return res
        .status(404)
        .json({ success: false, message: "Mentor not found" });
    }

    res.json({
      success: true,
      message: `Mentor status updated to ${status}`,
      mentor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Update failed", error: error.message });
  }
};
