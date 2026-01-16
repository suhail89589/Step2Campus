import dotenv from "dotenv";
// 1. Config environment variables BEFORE everything else
dotenv.config();

import app from "./src/app.js" // Ensure path is correct based on folder structure
import { connectDB } from "./src/config/db.js";

const startServer = async () => {
  try {
    // 2. Connect to Database
    await connectDB();

    // 3. Start Listening (Single source of truth)
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(
        `🚀 Server running in ${
          process.env.NODE_ENV || "development"
        } mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
