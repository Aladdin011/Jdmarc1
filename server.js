const app = require('./app');
const dotenv = require('dotenv').config({ path: '../.env' });
const connectDB = require('./config/db');
const logger = require('./config/logger');
const validateEnv = require('./config/validateEnv');

validateEnv();

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  }
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});