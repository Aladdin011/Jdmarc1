const mongoose = require("mongoose")

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the blog post
 *         title:
 *           type: string
 *           description: The title of the blog post
 *         content:
 *           type: string
 *           description: The content of the blog post
 *         image:
 *           type: string
 *           description: Optional URL to an image for the blog post
 *         author:
 *           type: string
 *           description: The author of the blog post
 *           default: JD Marc Editorial
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the blog post was created
 *       example:
 *         _id: 60d5ec49f8c7b0001c8c4c4d
 *         title: My First Blog Post
 *         content: This is the content of my first blog post.
 *         image: https://example.com/image.jpg
 *         author: JD Marc Editorial
 *         createdAt: 2023-01-01T12:00:00.000Z
 */
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // optional URL
  author: { type: String, default: "JD Marc Editorial" },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Blog", BlogSchema)