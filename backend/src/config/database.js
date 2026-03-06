const mongoose = require("mongoose");
const { env } = require("./env");

const connectDatabase = async () => {
  if (!env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  await mongoose.connect(env.MONGODB_URI);
  console.log("MongoDB connected successfully");
};

module.exports = { connectDatabase };
