const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser, getMe } = require("../controllers/authController");

const router = express.Router();
const { authMiddleware: protect, adminMiddleware: authorize } = require("../middleware/authMiddleware");

// Validation for registration
router.post(
  "/register",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Valid email is required").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({ min: 6 })
  ],
  registerUser
);

// Validation for login
router.post(
  "/login",
  [
    body("email", "Valid email is required").isEmail(),
    body("password", "Password is required").notEmpty()
  ],
  loginUser
);

router.get("/me", protect, getMe);

// Admin only route example
router.get("/admin-dashboard", protect, authorize("admin"), (req, res) => {
  res.json({ msg: "Welcome to the admin dashboard!" });
});

// Add verify and refresh endpoints
const { verifyToken, refreshToken } = require("../controllers/authController");

router.post("/verify", protect, verifyToken);
router.post("/refresh", protect, refreshToken);

module.exports = router;