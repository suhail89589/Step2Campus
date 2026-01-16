import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // SDE-2 Tip: Use optional chaining and check for 'Bearer' prefix explicitly
  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Distinguish between expired and invalid for better frontend UX
    const message =
      err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return res.status(401).json({ success: false, message });
  }
};

export const isAdmin = (req, res, next) => {
  console.log("Decoded User from Token:", req.user);
  
  if (!req.user || req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
  }
  next();
};

export const isMentor = (req, res, next) => {
  if (!req.user || (req.user.role !== "MENTOR" && req.user.role !== "ADMIN")) {
    return res
      .status(403)
      .json({
        success: false,
        message: "Access denied. Mentor privileges required.",
      });
  }
  next();
};
