import mongoose from "mongoose";

export const connectDB = async () => {
  const url = process.env.DATABASE_URL;

  if (!url) {
    console.error("❌ Error: DATABASE_URL missing in .env");
    process.exit(1);
  }

  const options = {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  };

  try {
    const conn = await mongoose.connect(url, options);
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    // Do not exit in production if you want a process manager to retry
    process.exit(1);
  }
};
