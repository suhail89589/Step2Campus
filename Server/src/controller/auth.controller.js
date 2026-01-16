import jwt from "jsonwebtoken";
import Mentor from "../models/Mentor.js";
import Student from "../models/student.js";
import cloudinary from "../config/cloudinary.js";

/**
 * Generates a standard JWT
 */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/**
 * Helper to upload buffer to Cloudinary
 */
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
};

// --- 1. MENTOR REGISTRATION ---
export const registerMentor = async (req, res) => {
  try {
    const {
      name,
      personalEmail,
      email,
      password,
      phoneNumber,
      age,
      college,
      branch,
      year,
      mentorReason,
      linkedin,
      expectedPrice, // Captured from frontend
    } = req.body;

    // Check if mentor already exists
    const existingUser = await Mentor.findOne({
      $or: [{ "emails.personal": personalEmail }, { "emails.college": email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered as a mentor.",
      });
    }

    let profileImageUrl = "";
    let collegeIdUrl = "";

    if (req.files) {
      if (req.files.profileImage) {
        profileImageUrl = await uploadToCloudinary(
          req.files.profileImage[0].buffer,
          "mentors_profiles"
        );
      }
      if (req.files.collegeId) {
        collegeIdUrl = await uploadToCloudinary(
          req.files.collegeId[0].buffer,
          "mentors_ids"
        );
      }
    }

    // Create record
    const mentor = await Mentor.create({
      name,
      password,
      phoneNumber,
      age,
      emails: { personal: personalEmail, college: email },
      education: { college, branch, year },
      socials: { linkedin },
      mentorReason,
      expectedPrice: Number(expectedPrice) || 0, // SDE-2 Tip: Convert string to Number
      profileImage: profileImageUrl,
      collegeIdCard: collegeIdUrl,
      role: "MENTOR",
      status: "PENDING",
    });

    res.status(201).json({
      success: true,
      message: "Application submitted! Awaiting admin approval.",
      id: mentor._id,
    });
  } catch (error) {
    console.error("Mentor Registration Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getMe = async (req, res) => {
  try {
    // Find the user in either collection based on the ID in the JWT
    const user =
      (await Mentor.findById(req.user.id)) ||
      (await Student.findById(req.user.id));

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const signupStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Email already in use.",
      });
    }

    const student = await Student.create({
      name,
      email,
      password,
      role: "STUDENT",
    });

    const token = generateToken(student._id, "STUDENT");

    res.status(201).json({
      success: true,
      token,
      user: {
        name: student.name,
        role: "STUDENT",
        id: student._id,
      },
    });
  } catch (error) {
    console.error("Student Signup Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = generateToken("ADMIN_ID", "ADMIN");
      return res.json({
        success: true,
        token,
        user: { name: "System Admin", role: "ADMIN" },
      });
    }

    let user = await Student.findOne({ email }).select("+password");
    let role = "STUDENT";

    if (!user) {
      user = await Mentor.findOne({
        $or: [{ "emails.personal": email }, { "emails.college": email }],
      }).select("+password");
      role = "MENTOR";
    }

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found." });
    }

    if (role === "MENTOR" && user.status !== "APPROVED") {
      return res.status(403).json({
        success: false,
        message: `Account status: ${user.status}. Please wait for approval.`,
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password." });
    }

    const token = generateToken(user._id, role);

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        role: role,
        id: user._id,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
