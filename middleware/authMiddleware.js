const jwt = require("jsonwebtoken");

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

exports.authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      next();
    } catch (error) {
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    throw new Error("Not authorized, no token");
  }
});

exports.adminMiddleware = (...roles) => {
  return asyncHandler(async (req, res, next) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ msg: `User role ${req.user.role} is not authorized to access this route` });
    }
    next();
  });
};