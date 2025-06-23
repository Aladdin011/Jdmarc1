const express = require('express');
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Blog = require("../models/Blog");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

// GET all posts
router.get("/", asyncHandler(async (req, res) => {
  const posts = await Blog.find().sort({ createdAt: -1 });
  res.json(posts);
}));

// GET one post
router.get("/:id", asyncHandler(async (req, res) => {
  const post = await Blog.findById(req.params.id);
  res.json(post);
}));

// CREATE (Admin only)
router.post("/", authMiddleware, adminMiddleware, asyncHandler(async (req, res) => {
  const newPost = await Blog.create(req.body);
  res.json(newPost);
}));

// DELETE (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, asyncHandler(async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ msg: "Post deleted" });
}));

module.exports = router;