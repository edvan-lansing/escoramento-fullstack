require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const defaultUsers = [
  {
    email: "admin@escoramento.com",
    password: "Admin@123",
    role: "admin",
  },
  {
    email: "editor@escoramento.com",
    password: "Editor@123",
    role: "editor",
  },
  {
    email: "manager@escoramento.com",
    password: "Manager@123",
    role: "manager",
  },
];

const seedUsers = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  for (const user of defaultUsers) {
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      existingUser.role = user.role;
      await existingUser.save();
      console.log(`UPDATED: ${user.email} -> ${user.role}`);
      continue;
    }

    await User.create(user);
    console.log(`CREATED: ${user.email} -> ${user.role}`);
  }

  await mongoose.disconnect();
};

seedUsers()
  .then(() => {
    console.log("Seed completed successfully.");
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("Seed failed:", error.message);
    try {
      await mongoose.disconnect();
    } catch {
      // noop
    }
    process.exit(1);
  });
