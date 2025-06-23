// Centralized error handler
const AppError = require('../utils/appError');
const logger = require('../config/logger');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    logger.error(err);
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') {
      const message = `Invalid ${error.path}: ${error.value}.`;
      error = new AppError(message, 400);
    }

    if (error.code === 11000) {
      const value = error.errmsg.match(/(['"])(?:(?=(\?))\2.)*?\1/)[0];
      const message = `Duplicate field value: ${value}. Please use another value!`;
      error = new AppError(message, 400);
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(el => el.message);
      const message = `Invalid input data. ${errors.join('. ')}`;
      error = new AppError(message, 400);
    }

    if (error.name === 'JsonWebTokenError') {
      error = new AppError('Invalid token. Please log in again!', 401);
    }

    if (error.name === 'TokenExpiredError') {
      error = new AppError('Your token has expired! Please log in again.', 401);
    }
    logger.error(error);
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message
    });
  }
};