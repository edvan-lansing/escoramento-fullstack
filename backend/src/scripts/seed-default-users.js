require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const defaultUsers = [
  {
    email: "admin@email.com",
    password: "Admin@123",
    role: "admin",
  },
  {
    email: "editor@email.com",
    password: "Editor@123",
    role: "editor",
  },
  {
    email: "manager@email.com",
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
    const existingUser = await User.findOne({
      $or: [{ role: user.role }, { email: user.email }],
    });

    if (existingUser) {
      const conflictingEmailUser = await User.findOne({
        email: user.email,
        _id: { $ne: existingUser._id },
      });

      if (conflictingEmailUser) {
        console.log(
          `SKIPPED: ${user.role} -> ${user.email} (email already used by another account)`
        );
        continue;
      }

      existingUser.email = user.email;
      existingUser.password = user.password;
      existingUser.role = user.role;
      await existingUser.save();
      console.log(`UPDATED: ${user.role} -> ${user.email}`);
      continue;
    }

    await User.create(user);
    console.log(`CREATED: ${user.role} -> ${user.email}`);
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
