import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// SDE-2 Debug: This should now print ONLY 'dpiplj9jh'
console.log("DEBUG: Cloud Name is ->", process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
