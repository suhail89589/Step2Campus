import express from "express";
import multer from "multer";
import {login, signupStudent, registerMentor, getMe } from "../controller/auth.controller.js";
import {authenticate}  from "../middleware/auth.midlleware.js"
const router = express.Router();

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post("/login", login);          
router.post("/signup", signupStudent);
router.get("/me", authenticate, getMe);
router.post(
  "/register-mentor",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "collegeId", maxCount: 1 },
  ]),
  registerMentor
);


export default router;
