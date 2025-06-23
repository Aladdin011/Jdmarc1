const path = require('path');
console.log('Current working directory:', process.cwd());
const envPath = path.resolve(__dirname, '../.env');
console.log('Resolved .env path:', envPath);
require('dotenv').config({ path: envPath });
console.log('MONGO_URI:', process.env.MONGO_URI);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdminUser = async () => {
  console.log('Attempting to connect to MongoDB...');
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = 'admin@example.com';
    const password = 'adminpassword';
    const name = 'Admin User';

    let adminUser = await User.findOne({ email });

    if (adminUser) {
      console.log('Admin user already exists. Updating password if necessary.');
      const salt = await bcrypt.genSalt(10);
      adminUser.password = await bcrypt.hash(password, salt);
      await adminUser.save();
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      adminUser = new User({
        name,
        email,
        password: hashedPassword,
        role: 'admin',
      });

      await adminUser.save();
      console.log('Admin user created successfully!');
    }
    console.log('Admin User Details:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Role: ${adminUser.role}`);

    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);

    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();