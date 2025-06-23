const express = require("express");
const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');
const { adminMiddleware, authMiddleware } = require("../middleware/authMiddleware");
const User = require("../models/User");

// Assign department (admin-only route)
router.patch(
  "/:id/assign-department",
  authMiddleware,
  adminMiddleware,
  body("department")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Department is required"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { department: req.body.department },
        { new: true }
      );
      res.json(user);
    }
  })
);

module.exports = router;