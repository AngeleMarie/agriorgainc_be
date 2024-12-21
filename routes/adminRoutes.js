import express from "express";
import adminController from "../controllers/adminController.js";

const router = express.Router();

// Admin Registration Route
router.post("/register", adminController.registerAdmin);

// Admin Login Route
router.post("/login", adminController.loginAdmin);
// router.post("/update", adminController.resetPassword);


export default router
