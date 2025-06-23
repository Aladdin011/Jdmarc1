const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user, must be unique
 *         password:
 *           type: string
 *           format: password
 *           description: The hashed password of the user
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           default: user
 *           description: The role of the user
 *         department:
 *           type: string
 *           enum: [Secretariat, Business Development, Project, Account, HR, Digital Marketing, Admin]
 *           default: Secretariat
 *           description: The department the user belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was last updated
 *       example:
 *         _id: 60d5ec49f8c7b0001c8c4c4c
 *         name: John Doe
 *         email: john.doe@example.com
 *         role: user
 *         department: Secretariat
 *         createdAt: 2023-01-01T12:00:00.000Z
 *         updatedAt: 2023-01-01T12:00:00.000Z
 */
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  department: {
    type: String,
    enum: [
      "Secretariat",
      "Business Development",
      "Project",
      "Account",
      "HR",
      "Digital Marketing",
      "Admin"
    ],
    default: "Secretariat"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);