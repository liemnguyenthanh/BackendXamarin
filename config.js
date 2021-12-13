import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 2000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://dbshop:p8LJ9t4d2RRIaNvT@cluster0.78vh7.mongodb.net/Xstock?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};
