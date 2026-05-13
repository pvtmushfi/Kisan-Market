import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const deleteUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const result = await User.deleteMany({});
    console.log(`✅ ${result.deletedCount} users deleted`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

deleteUsers();